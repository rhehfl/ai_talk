"use client";

import GithubLoginButton from "@/app/_components/GithubLoginButton";
import GoogleLoginButton from "@/app/_components/GoogleLoginButton";
import { useAuth } from "@/app/_hooks";
import Image from "next/image";

interface ProfileIconProps {
  onClick?: () => void;
}
export default function ProfileIcon({ onClick }: ProfileIconProps) {
  const user = useAuth();

  if (user) {
    return (
      <button
        className="cursor-pointer p-1 rounded-full hover:bg-gray-200"
        onClick={onClick}
      >
        <Image
          className="rounded-full hover:inset-shadow-sm transition shadow-xl"
          src={user.profileUrl}
          alt={user.nickname}
          width={40}
          height={40}
        />
      </button>
    );
  }

  return (
    <div className="flex flex-col">
      <GoogleLoginButton />
      <GithubLoginButton />
    </div>
  );
}
