"use client";

import { ChatIcon } from "@/app/_icons";
import ProfileCard from "@/app/chat/_components/ProfileCard";
import { Suspense } from "react";

export default function SideBar() {
  return (
    <>
      <div className="dark:bg-gray-800 dark:border dark:border-r-2 dark:border-gray-700 flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0 hidden md:flex">
        <div className="flex flex-row items-center justify-center h-12 w-full">
          <div className="flex items-center justify-center rounded-2xl bg-indigo-100 dark:bg-white h-10 w-10">
            <ChatIcon />
          </div>
          <div className="ml-2 font-bold text-2xl dark:text-white">채팅방</div>
        </div>
        <Suspense fallback={<>Loading......</>}>
          <ProfileCard size="large" />
        </Suspense>
      </div>
    </>
  );
}
