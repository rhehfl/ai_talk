"use client";

import ChatRoomList from "@/app/chat-rooms/_components/ChatRoomList";
import { Suspense } from "react";

export default function SuspenseChatRoomList() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatRoomList />
    </Suspense>
  );
}
