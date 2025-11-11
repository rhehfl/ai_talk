"use client";

import { useLocalStorage } from "@/app/_hooks";
import { usePathname } from "next/navigation";

export default function GithubLoginButton() {
  const path = usePathname();

  const [, setRedirectPath] = useLocalStorage({
    key: "redirectPath",
    initialValue: "/",
  });
  const handleGithubLogin = () => {
    setRedirectPath(path);
    if (process.env.NODE_ENV === "development") {
      window.location.href = "http://localhost:8080/api/auth/github";
    } else {
      window.location.href = "https://api.doran-doran.cloud/api/auth/github";
    }
  };

  return <button onClick={handleGithubLogin}>깃허브로 로그인하기</button>;
}
