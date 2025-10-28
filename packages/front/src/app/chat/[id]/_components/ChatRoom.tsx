"use client";

import {
  ChatSendForm,
  AILoadingMessage,
  EmptyChatCard,
} from "@/app/chat/[id]/_components";
import ChatList from "@/app/chat/[id]/_components/ChatList";
import {
  useChat,
  useChatHistoryUpdater,
  useTypingEffect,
} from "@/app/chat/[id]/_hooks";
import { Message } from "common";
import { useParams } from "next/navigation";
import { Suspense } from "react";

export default function ChatRoom() {
  const { id } = useParams();
  const { displayedText, addChunk, setText, reset } = useTypingEffect();
  const { historyUpdater } = useChatHistoryUpdater(Number(id));
  const { isAiThinking, sendMessage } = useChat(Number(id), {
    onStream: (chunk: string) => addChunk(chunk),
    onStreamError: (message: string) => {
      setText(`[오류 발생] ${message}`);
      reset();
    },
    onStreamDone: (fullText: string) => {
      const finalAiMessage: Message = {
        author: "Gemini",
        content: fullText,
      };
      historyUpdater(finalAiMessage);
      reset();
    },
    onMessage: (message: Message) => {
      historyUpdater(message);
    },
    onSendComplete(message) {
      historyUpdater(message);
    },
  });

  return (
    <>
      <div className="px-4 flex-grow overflow-y-auto">
        <Suspense fallback={<div>Loading...</div>}>
          <ChatList streamingMessage={displayedText} />
        </Suspense>
        {isAiThinking && !displayedText && <EmptyChatCard />}
        {displayedText && <AILoadingMessage streamingMessage={displayedText} />}
      </div>
      <ChatSendForm onSubmit={sendMessage} />
    </>
  );
}
