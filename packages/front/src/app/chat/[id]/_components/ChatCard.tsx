import { ProfileCard } from "@/app/chat/[id]/_components";
import { transition } from "@ssgoi/react";
import { slide } from "@ssgoi/react/transitions";
import { Message } from "common";
import { memo } from "react";
import Markdown from "react-markdown";

interface ChatCardProps extends Message {
  id: number;
}

export default memo(function ChatCard({ id, author, content }: ChatCardProps) {
  return (
    <div
      ref={transition({
        key: `chat-card-${id}`,
        ...slide({
          direction: "up",
        }),
      })}
      className={`flex lg:items-end mb-2 lg:flex-row flex-col  ${
        author === "user"
          ? "lg:justify-end items-end"
          : "lg:justify-start items-start"
      }`}
    >
      {author !== "user" && <ProfileCard size="small" />}
      <div
        className="relative max-w-lg px-4 py-2 rounded-lg"
        style={{
          backgroundColor: author === "user" ? "#E0E7FF" : "#F3F4F6",
          order: author === "user" ? 2 : 1,
        }}
      >
        <div className="text-sm">
          <Markdown>{content}</Markdown>
        </div>
      </div>
    </div>
  );
});
