"use client";

import { getChatRoomInfo } from "@/app/chat/[id]/_asyncApis";
import { useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";

interface ProfileCardProps {
  size: "small" | "large";
}

export default function ProfileCard({ size }: ProfileCardProps) {
  const { data } = useSuspenseQuery({
    queryKey: ["chatRoomInfo"],
    queryFn: getChatRoomInfo,
  });

  if (size === "small") {
    return (
      <div className="flex flex-col min-w-15 items-center space-y-2 order-1 mr-2">
        <Image
          src={`/${data.image}`}
          className="dark:rounded-full"
          alt="Avatar"
          width={32}
          height={32}
        />
        <span className="text-xs text-gray-500 break-words max-w-[50px] text-center dark:text-white">
          {data.name}
        </span>
      </div>
    );
  }

  return (
    <div className="dark:bg-slate-700 dark:border-slate-500 flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
      <div className="h-20 w-20 rounded-full border overflow-hidden">
        <Image
          src={`/${data.image}`}
          alt="Avatar"
          width={80}
          height={80}
          className="h-full w-full"
        />
      </div>
      <div className="dark:text-white text-sm font-semibold mt-2">
        {data.name}
      </div>
    </div>
  );
}
