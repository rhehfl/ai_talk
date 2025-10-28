// hooks/useLocalStorage.ts
import {
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";

interface UseLocalStorageProps<T> {
  key: string;
  initialValue?: T;
}

type ReturnType<T> = [
  T | null,
  (value: SetStateAction<T | null>) => void,
  () => void,
];
const CUSTOM_EVENT_KEYS = "doran-doran-local-storage-event";

const localStorageEventHandler = {
  key: CUSTOM_EVENT_KEYS,
  subscribe: (callback: () => void) => {
    window.addEventListener(CUSTOM_EVENT_KEYS, callback);
  },
  unsubscribe: (callback: () => void) => {
    window.removeEventListener(CUSTOM_EVENT_KEYS, callback);
  },
  dispatchEvent: () => {
    window.dispatchEvent(new StorageEvent(CUSTOM_EVENT_KEYS));
  },
};

const subscribe = (callback: () => void) => {
  localStorageEventHandler.subscribe(callback);
  return () => {
    localStorageEventHandler.unsubscribe(callback);
  };
};

const getSnapshot = (key: string) => {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
};
export const useLocalStorage = <T>({
  key,
  initialValue,
}: UseLocalStorageProps<T>): ReturnType<T> => {
  const externalStoreState = useSyncExternalStore(
    subscribe,
    () => getSnapshot(key),
    () => null,
  );
  useEffect(() => {
    if (typeof window === "undefined" || initialValue === undefined) {
      return;
    }

    const currentValue = getSnapshot(key);

    if (currentValue === null) {
      try {
        window.localStorage.setItem(key, JSON.stringify(initialValue));
        localStorageEventHandler.dispatchEvent();
      } catch (err) {
        console.error(`localStorage 키 "${key}" 초기화 실패:`, err);
      }
    }
  }, [key, initialValue]);
  const state = useMemo(() => {
    if (externalStoreState !== null) {
      try {
        return JSON.parse(externalStoreState) as T;
      } catch {
        return initialValue !== undefined ? initialValue : null;
      }
    }

    if (initialValue !== undefined) {
      return initialValue;
    }

    return null;
  }, [externalStoreState, initialValue]);

  const setState = useCallback(
    (value: SetStateAction<T | null>) => {
      try {
        const valueToStore = value instanceof Function ? value(state) : value;
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        localStorageEventHandler.dispatchEvent();
      } catch (err) {
        throw new Error(
          `로컬 스토리지 "${key}" key에 데이터를 저장하는데 실패했습니다: ${err}`,
        );
      }
    },
    [key, state],
  );

  const removeState = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      localStorageEventHandler.dispatchEvent();
    } catch (err) {
      throw new Error(
        `로컬 스토리지 "${key}" key의 데이터를 삭제하는데 실패했습니다: ${err}`,
      );
    }
  }, [key]);

  return [state, setState, removeState];
};
