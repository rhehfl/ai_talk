"use client";

import { Message } from "common";
import { useEffect, useRef } from "react";

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
          {msg.author !== "user" && (
            <div className="flex flex-col items-center space-y-2 order-1 mr-2">
              <img
                src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${msg.author}`}
                alt="Avatar"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-xs text-gray-500 break-words max-w-[50px] text-center">
                {msg.author}
              </span>
            </div>
          )}
          <div
            className="relative max-w-xs px-4 py-2 rounded-lg"
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
            <p className="text-sm">{msg.content}</p>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
