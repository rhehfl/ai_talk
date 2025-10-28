"use client";
import { ProfileCard } from "@/app/chat/[id]/_components";
import Markdown from "react-markdown";

interface AILoadingMessageProps {
  streamingMessage: string;
}
export default function AILoadingMessage({
  streamingMessage,
}: AILoadingMessageProps) {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-end mb-2">
        <ProfileCard size="small" />
        <div className="relative max-w-lg px-4 py-2 rounded-lg bg-[#F3F4F6]">
          <div className="text-sm">
            <Markdown>{streamingMessage}</Markdown>
          </div>
        </div>
      </div>
    </div>
  );
}
