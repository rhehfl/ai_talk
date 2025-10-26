"use client";
import LoadingSpinner from "@/app/_icons/LoadingSpinner.";

interface AILoadingMessageProps {
  streamingMessage: string;
}
export default function AILoadingMessage({
  streamingMessage,
}: AILoadingMessageProps) {
  return (
    <div className="flex items-center space-x-2">
      <LoadingSpinner />
      <span>{streamingMessage || "잠시만 기다려주세요...."}</span>
    </div>
  );
}
