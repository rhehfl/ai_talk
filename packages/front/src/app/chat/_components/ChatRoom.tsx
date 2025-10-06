"use client";

import { ChatCard, ChatSendForm } from "@/app/chat/_components";
import AILoadingMessage from "@/app/chat/_components/AILoadingMessage";
import { useSocket } from "@/app/chat/_hooks";
import { useEffect, useRef } from "react";

export default function ChatRoom() {
  const { sendMessage, messages, isLoading } = useSocket();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (msg: string) => {
    sendMessage(msg);
  };

  return (
    <>
      <div className="px-4 flex-grow overflow-y-auto">
        {messages.map((msg, index) => (
          <ChatCard key={index} author={msg.author} content={msg.content} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      {isLoading && <AILoadingMessage />}
      <ChatSendForm onSubmit={handleSendMessage} />
    </>
  );
}
