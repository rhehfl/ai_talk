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
import { useSocket } from "@/app/chat/[id]/_hooks";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";

export default function ChatRoom() {
  // const { data } = useSuspenseQuery({
  //   queryKey: ["chatRoomInfo"],
  //   queryFn: getChatRoomInfo,
  // });
  // const { data: chatHistory } = useSuspenseQuery({
  //   queryFn: getChatRoomHistory,
  //   queryKey: ["chatRoomHistory", data.id],
  // });
  const params = useParams();
  const { messages, isLoading, sendMessage } = useSocket(params.id);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="px-4 flex-grow overflow-y-auto">
        {/* {chatHistory.map((msg, index) => (
          <ChatCard key={index} author={msg.author} content={msg.content} />
        ))} */}
        <div ref={messagesEndRef} />
      </div>
      {isLoading && <AILoadingMessage />}
      <ChatSendForm onSubmit={sendMessage} />
    </>
  );
}
