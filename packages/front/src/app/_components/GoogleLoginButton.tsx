"use client";

import { useLocalStorage } from "@/app/_hooks";
import { usePathname } from "next/navigation";

export default function GoogleLoginButton() {
  const path = usePathname();

  const [, setRedirectPath] = useLocalStorage({
    key: "redirectPath",
    initialValue: "/",
  });
  const handleGoogleLogin = () => {
    setRedirectPath(path);
    if (process.env.NODE_ENV === "development") {
      window.location.href = "http://localhost:8080/api/auth/google";
    } else {
      window.location.href = "https://api.doran-doran.cloud/api/auth/google";
    }
  };

  return <button onClick={handleGoogleLogin}>구글로 로그인하기</button>;
}
