"use client";

import { useUnmount } from "@/app/_hooks";
import { useState, useRef, useCallback } from "react";

const STREAM_SPEED_MS = 30;

export const useTypingEffect = (speed: number = STREAM_SPEED_MS) => {
  const [displayedText, setDisplayedText] = useState("");
  const charQueue = useRef<string>("");
  const intervalId = useRef<NodeJS.Timeout | null>(null);

  const reset = useCallback(() => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
    charQueue.current = "";
    setDisplayedText("");
  }, []);

  const setText = useCallback(
    (text: string) => {
      reset();
      setDisplayedText(text);
    },
    [reset],
  );

  const addChunk = useCallback(
    (chunk: string) => {
      charQueue.current += chunk;
      if (intervalId.current) {
        return;
      }

      intervalId.current = setInterval(() => {
        const char = charQueue.current.substring(0, 1);

        if (char) {
          charQueue.current = charQueue.current.substring(1);
          setDisplayedText((prev) => prev + char);
        } else {
          reset();
        }
      }, speed);
    },
    [speed, reset],
  );
  useUnmount(reset);

  return { displayedText, addChunk, reset, setText };
};
