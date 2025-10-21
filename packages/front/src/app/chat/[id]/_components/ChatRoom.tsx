"use client";

import { ChatSendForm, AILoadingMessage } from "@/app/chat/[id]/_components";
import ChatList from "@/app/chat/[id]/_components/ChatList";
import { useChat } from "@/app/chat/[id]/_hooks";
import { useParams } from "next/navigation";
import { Suspense } from "react";

export default function ChatRoom() {
  const { id } = useParams();
  const { sendMessage, isAiThinking } = useChat(Number(id));

  return (
    <>
      <div className="px-4 flex-grow overflow-y-auto">
        <Suspense fallback={<div>Loading...</div>}>
          <ChatList />
        </Suspense>
      </div>
      {isAiThinking && <AILoadingMessage />}
      <ChatSendForm onSubmit={sendMessage} />
    </>
  );
}
