"use client";

import dynamic from "next/dynamic";

const DynamicSideBarWithNoSSR = dynamic(
  () => import("@/app/chat/_components/SideBar"),
  { ssr: false },
);
const DynamicChatRoomWithNoSSR = dynamic(
  () => import("@/app/chat/_components/ChatRoom"),
  { ssr: false },
);
export default function ChatPage() {
  return (
    <div className="flex h-screen bg-gray-100 antialiased text-gray-800">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <DynamicSideBarWithNoSSR />
        <div className="p-0 lg:p-10 flex flex-col w-full">
          <div className="flex flex-col h-full bg-white rounded-2xl py-10 px-4 lg:px-8">
            <DynamicChatRoomWithNoSSR />
          </div>
        </div>
      </div>
    </div>
  );
}
