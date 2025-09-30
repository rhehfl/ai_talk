"use client";

import { getChatRoomInfo } from "@/app/chat/_asyncApis";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function ProfileCard() {
  const { data } = useSuspenseQuery({
    queryKey: ["chatRoomInfo"],
    queryFn: getChatRoomInfo,
  });
  return (
    <div className="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
      <div className="h-20 w-20 rounded-full border overflow-hidden">
        <img src={data.image} alt="Avatar" className="h-full w-full" />
      </div>
      <div className="text-sm font-semibold mt-2">{data.name}</div>
    </div>
  );
}
