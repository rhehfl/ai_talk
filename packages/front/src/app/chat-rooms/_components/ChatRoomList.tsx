"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { ChatRoomCard } from "@/app/chat-rooms/_components";
import { chatRoomQueries } from "@/app/_queries";

export default function ChatRoomList() {
  const { data } = useSuspenseQuery(chatRoomQueries.list());

  return (
    <ul className="flex flex-col gap-5">
      {data.map((chat) => (
        <ChatRoomCard key={chat.id} {...chat} />
      ))}
    </ul>
  );
}
