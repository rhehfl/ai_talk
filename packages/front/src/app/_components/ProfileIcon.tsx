"use client";

import GithubLoginButton from "@/app/_components/GithubLoginButton";
import GoogleLoginButton from "@/app/_components/GoogleLoginButton";
import { useAuth } from "@/app/_hooks";
import { transition } from "@ssgoi/react";
import { slide } from "@ssgoi/react/transitions";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function ProfileIcon() {
  const profileRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const user = useAuth();
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  if (user) {
    return (
      <div className="relative" ref={profileRef}>
        <button
          className="cursor-pointer p-1 rounded-full hover:bg-gray-200"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Image
            className="rounded-full hover:inset-shadow-sm transition shadow-xl"
            src={user.profileUrl}
            alt={user.nickname}
            width={40}
            height={40}
          />
        </button>
        {isOpen && (
          <ul
            ref={transition({
              key: "profile-dropdown",
              ...slide({
                direction: "up",
                distance: 20,
              }),
            })}
            className="bg-transparent absolute right-0 mt-2 w-48 rounded-2xl shadow-lg z-10"
          >
            <button className="w-full hover:bg-gray-300 rounded-2xl cursor-pointer transition">
              <li className="px-4 py-2 text-center text-gray-700">로그아웃</li>
            </button>
          </ul>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <GoogleLoginButton />
      <GithubLoginButton />
    </div>
  );
}
