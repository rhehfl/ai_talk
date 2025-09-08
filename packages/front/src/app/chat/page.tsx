"use client";

import { useState, useRef, useEffect } from "react";
import { Message } from "common";
import { SideBar } from "@/app/chat/_components";
import { useSocket } from "@/app/chat/_hooks";

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      author: "ChatGPT",
      content: "채팅방에 오신 것을 환영합니다! 메시지를 보내보세요.",
      timestamp: Date.now() - 60000,
    },
    {
      id: "2",
      author: "User",
      content: "안녕하세요!",
      timestamp: Date.now() - 30000,
    },
  ]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { socket } = useSocket();
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() === "" || !socket) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      author: "나",
      content: inputMessage,
      timestamp: Date.now(),
    };

    socket.send(JSON.stringify(newMessage));
    setInputMessage("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex h-screen bg-gray-100 antialiased text-gray-800">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <SideBar />
        <div className="flex flex-col flex-auto h-full p-6">
          <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-white p-4 h-full">
            <div className="flex flex-col h-full overflow-x-hidden overflow-y-auto mb-4">
              <div className="flex flex-col h-full">
                {messages.map((msg, index) => (
                  <div
                    key={msg.id}
                    className={`flex items-end mb-2 ${
                      msg.author === "나" ? "justify-end" : ""
                    }`}
                  >
                    {msg.author !== "나" && ( // 다른 사람 메시지일 때만 아바타 표시
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
                        backgroundColor:
                          msg.author === "나" ? "#E0E7FF" : "#F3F4F6",
                        order: msg.author === "나" ? 2 : 1,
                      }}
                    >
                      {msg.author === "나" ? (
                        <></>
                      ) : (
                        <div className="text-sm font-semibold mb-1 hidden">
                          {msg.author}
                        </div>
                      )}
                      <p className="text-sm">{msg.content}</p>
                      <span className="text-xs text-gray-500 block text-right mt-1">
                        {new Date(msg.timestamp).toLocaleTimeString("ko-KR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>
            <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
              <form className="flex w-full" onSubmit={handleSendMessage}>
                <div className="flex-grow ml-4">
                  <div className="relative w-full">
                    <input
                      type="text"
                      className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="메시지를 입력하세요..."
                    />
                  </div>
                </div>
                <div className="ml-4">
                  <button
                    type="submit"
                    className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                  >
                    <span>보내기</span>
                    <span className="ml-2">
                      <svg
                        className="w-4 h-4 transform rotate-45 -mt-px"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        ></path>
                      </svg>
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
