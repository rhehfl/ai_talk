"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { ChatRoomCard } from "@/app/chat-rooms/_components";
import { chatRoomQueries } from "@/app/_queries";

export default function ChatRoomList() {
  const { data: chatRoomList } = useSuspenseQuery(chatRoomQueries.list());

  if (chatRoomList.length === 0) {
    return (
      <p className="text-center text-gray-500">참여중인 채팅방이 없습니다.</p>
    );
  }

  return (
    <ul className="flex flex-col gap-5">
      {chatRoomList.map((chat) => (
        <ChatRoomCard key={chat.id} {...chat} />
      ))}
    </ul>
  );
}
