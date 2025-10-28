import ProfileCard from "@/app/chat/[id]/_components/ProfileCard";
import { transition } from "@ssgoi/react";
import { fade } from "@ssgoi/react/transitions";

export default function EmptyChatCard() {
  return (
    <div
      className="flex items-center space-x-2"
      ref={transition({
        key: "empty-chat-card",
        ...fade(),
      })}
    >
      <div className="flex items-end mb-2">
        <ProfileCard size="small" />
        <div className="relative max-w-lg py-5 rounded-lg bg-[#d7d9dc] animate-pulse">
          <div className="text-sm w-30" />
        </div>
      </div>
    </div>
  );
}
