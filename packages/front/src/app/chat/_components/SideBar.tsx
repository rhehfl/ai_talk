"use client";

import { ChatIcon } from "@/app/_icons";
import ProfileCard from "@/app/chat/_components/ProfileCard";
import { Suspense } from "react";

export default function SideBar() {
  return (
    <>
      <div className="flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0 hidden md:flex">
        <div className="flex flex-row items-center justify-center h-12 w-full">
          <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
            <ChatIcon />
          </div>
          <div className="ml-2 font-bold text-2xl">채팅방</div>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <ProfileCard />
        </Suspense>
      </div>
    </>
  );
}
