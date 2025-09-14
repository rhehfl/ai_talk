"use client";

import { Message } from "common";
import { ChatRoom, ChatSendForm, SideBar } from "@/app/chat/_components";
import { useSocket } from "@/app/chat/_hooks";

export default function ChatPage() {
  const { socket, messages, setMessages } = useSocket();
  const handleSendMessage = (msg: string) => {
    if (!socket) return;
    const newMessage: Message = {
      id: Date.now().toString(),
      author: "나",
      content: msg,
      timestamp: Date.now(),
    };

    socket.send(JSON.stringify(newMessage));
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  return (
    <div className="flex h-screen bg-gray-100 antialiased text-gray-800">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <SideBar />
        <div className="flex flex-col flex-auto h-full p-6">
          <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-white p-4 h-full">
            <ChatRoom messages={messages} />
            <ChatSendForm onSubmit={handleSendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
}
