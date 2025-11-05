"use client";
import { useLocalStorage } from "@/app/_hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthCallbackPage() {
  const router = useRouter();

  const [redirectPath, _, remove] = useLocalStorage<string | null>({
    key: "redirectPath",
  });

  useEffect(() => {
    router.replace(redirectPath || "/");
    return () => remove();
  }, []);
  return <div>로그인 중...</div>;
}
