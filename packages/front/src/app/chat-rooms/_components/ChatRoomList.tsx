"use client";

import { getAllChatRooms } from "@/app/chat-rooms/_asyncApis";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ChatRoomCard } from "@/app/chat-rooms/_components";

export default function ChatRoomList() {
  const { data } = useSuspenseQuery({
    queryKey: ["chatRooms"],
    queryFn: getAllChatRooms,
    staleTime: 60 * 1000 * 5,
  });

  return (
    <div>
      {data.map((chat) => (
        <ChatRoomCard key={chat.id} chat={chat} />
      ))}
    </div>
  );
}
