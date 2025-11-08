"use client";

import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { ChatRoomCard } from "@/app/chat-rooms/_components";
import { chatRoomQueries, userQueries } from "@/app/_queries";

export default function ChatRoomList() {
  const { data } = useSuspenseQuery(chatRoomQueries.list());
  const { data: userData } = useQuery(userQueries.me());
  console.log("Current User:", userData);
  return (
    <ul className="flex flex-col gap-5">
      {data.map((chat) => (
        <ChatRoomCard key={chat.id} {...chat} />
      ))}
    </ul>
  );
}
