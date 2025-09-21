import { ChatIcon } from "@/app/_icons";

export default function SideBar() {
  return (
    <>
      <div className="flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0 hidden md:flex">
        <div className="flex flex-row items-center justify-center h-12 w-full">
          <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
            <ChatIcon />
          </div>
          <div className="ml-2 font-bold text-2xl">채팅방</div>
        </div>
        <div className="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
          <div className="h-20 w-20 rounded-full border overflow-hidden">
            <img
              src="https://picsum.photos/200"
              alt="Avatar"
              className="h-full w-full"
            />
          </div>
          <div className="text-sm font-semibold mt-2">게스트</div>
          <div className="text-xs text-gray-500">Active</div>
        </div>
      </div>
    </>
  );
}
