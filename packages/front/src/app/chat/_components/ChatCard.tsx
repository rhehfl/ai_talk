import ProfileCard from "@/app/chat/_components/ProfileCard";
import Markdown from "react-markdown";

interface ChatCardProps {
  author: "user" | "Gemini";
  content: string;
}

export default function ChatCard({ author, content }: ChatCardProps) {
  return (
    <div
      className={`flex items-end mb-2 ${
        author === "user" ? "justify-end" : ""
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
        {author === "user" ? (
          <></>
        ) : (
          <div className="text-sm font-semibold mb-1 hidden">{author}</div>
        )}
        <div className="text-sm">
          <Markdown>{content}</Markdown>
        </div>
      </div>
    </div>
  );
}
