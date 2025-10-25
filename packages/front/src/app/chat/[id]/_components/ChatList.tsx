"use client";

import { chatRoomQueries } from "@/app/_queries";
import { ChatCard } from "@/app/chat/[id]/_components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";

export default function ChatList() {
  const { id } = useParams();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: messages } = useSuspenseQuery(
    chatRoomQueries.history(Number(id)!),
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {messages.map((msg, index) => (
        <ChatCard key={index} author={msg.author} content={msg.content} />
      ))}
      <div ref={messagesEndRef} />
    </>
  );
}
