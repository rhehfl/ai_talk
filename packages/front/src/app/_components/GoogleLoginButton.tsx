"use client";

export default function GoogleLoginButton() {
  const handleGoogleLogin = () => {
    if (process.env.NODE_ENV === "development") {
      window.location.href = "http://localhost:8080/api/auth/google";
    } else {
      window.location.href = "https://api.doran-doran.cloud/api/auth/google";
    }
  };

  return <button onClick={handleGoogleLogin}>구글로 로그인하기</button>;
}
