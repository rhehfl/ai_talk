"use client";

import { ChatSendForm, AILoadingMessage } from "@/app/chat/[id]/_components";
import ChatList from "@/app/chat/[id]/_components/ChatList";
import { useChat, useTypingEffect } from "@/app/chat/[id]/_hooks";
import { useParams } from "next/navigation";
import { Suspense } from "react";

export default function ChatRoom() {
  const { id } = useParams();
  const { displayedText, addChunk, reset, setText } = useTypingEffect();
  const { sendMessage, isAiThinking } = useChat(Number(id), {
    onStream: (chunk: string) => addChunk(chunk),
    onStreamDone: () => reset(),
    onStreamError: (message: string) => {
      setText(`[오류 발생] ${message}`);
    },
  });

  return (
    <>
      <div className="px-4 flex-grow overflow-y-auto">
        <Suspense fallback={<div>Loading...</div>}>
          <ChatList />
        </Suspense>
        {isAiThinking && <AILoadingMessage streamingMessage={displayedText} />}
      </div>
      <ChatSendForm onSubmit={sendMessage} />
    </>
  );
}
