"use client";

import { ProfileCard } from "@/app/chat/_components";
import { Message } from "common";
import { useEffect, useRef } from "react";
import Markdown from "react-markdown";

interface ChatRoomProps {
  messages: Message[];
}

export default function ChatRoom({ messages }: ChatRoomProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="px-4">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex items-end mb-2 ${
            msg.author === "user" ? "justify-end" : ""
          }`}
        >
          {msg.author !== "user" && <ProfileCard size="small" />}
          <div
            className="relative max-w-lg px-4 py-2 rounded-lg"
            style={{
              backgroundColor: msg.author === "user" ? "#E0E7FF" : "#F3F4F6",
              order: msg.author === "user" ? 2 : 1,
            }}
          >
            {msg.author === "user" ? (
              <></>
            ) : (
              <div className="text-sm font-semibold mb-1 hidden">
                {msg.author}
              </div>
            )}
            <div className="text-sm">
              <Markdown>{msg.content}</Markdown>
            </div>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
