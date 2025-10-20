"use client";

import {
  getChatRoomHistory,
  getChatRoomInfo,
} from "@/app/chat/[id]/_asyncApis";
import {
  ChatCard,
  ChatSendForm,
  AILoadingMessage,
} from "@/app/chat/[id]/_components";
import { useChat } from "@/app/chat/[id]/_hooks";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";

export default function ChatRoom() {
  const { id } = useParams();
  const { messages, isLoading, sendMessage } = useChat(Number(id));
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="px-4 flex-grow overflow-y-auto">
        {messages.map((msg, index) => (
          <ChatCard key={index} author={msg.author} content={msg.content} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      {isLoading && <AILoadingMessage />}
      <ChatSendForm onSubmit={sendMessage} />
    </>
  );
}
