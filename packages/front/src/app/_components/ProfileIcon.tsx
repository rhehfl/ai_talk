"use client";

import GoogleLoginButton from "@/app/_components/GoogleLoginButton";
import { useAuth } from "@/app/_hooks";
import Image from "next/image";

export default function ProfileIcon() {
  const user = useAuth();
  if (user) {
    return (
      <Image src={user.profileUrl} alt={user.nickname} width={40} height={40} />
    );
  }

  return <GoogleLoginButton />;
}
