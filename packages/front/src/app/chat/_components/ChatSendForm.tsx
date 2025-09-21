"use client";

import { useState } from "react";

interface ChatSendFormProps {
  onSubmit: (msg: string) => void;
}

export default function ChatSendForm({ onSubmit }: ChatSendFormProps) {
  const [inputMessage, setInputMessage] = useState<string>("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() === "") return;
    onSubmit(inputMessage);
    setInputMessage("");
  };

  return (
    <form className="flex w-full mt-5" onSubmit={handleSendMessage}>
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
          className="w-15 h-full lg:w-auto flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0 cursor-pointer"
        >
          <span className="hidden lg:block">보내기</span>
          <span className="m-0 lg:ml-2">
            <SendIcon />
          </span>
        </button>
      </div>
    </form>
  );
}

function SendIcon() {
  return (
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
  );
}
