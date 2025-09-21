"use client";

import { ChatRoom, ChatSendForm, SideBar } from "@/app/chat/_components";
import AILoadingMessage from "@/app/chat/_components/AILoadingMessage";
import { useSocket } from "@/app/chat/_hooks";

export default function ChatPage() {
  const { sendMessage, messages, isLoading } = useSocket();
  const handleSendMessage = (msg: string) => {
    sendMessage(msg);
  };
  return (
    <div className="flex h-screen bg-gray-100 antialiased text-gray-800">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <SideBar />
        <div className="p-0 lg:p-10 flex flex-col w-full ">
          <div className="flex flex-col h-full bg-white rounded-2xl py-10 px-4 lg:fpx-8 justify-between">
            <ChatRoom messages={messages} />
            {isLoading && <AILoadingMessage />}
            <ChatSendForm onSubmit={handleSendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
}
