"use client";

import { ChatRoom } from "common";
import Link from "next/link";

export default function ChatRoomCard({ id, persona, updatedAt }: ChatRoom) {
  return (
    <Link href={`/chat/${id}`} passHref>
      <div
        className="p-4 rounded-xl shadow-lg transition duration-300
                      bg-white dark:bg-gray-800
                      hover:ring-2 hover:ring-indigo-500 dark:hover:ring-indigo-400
                      flex items-center cursor-pointer"
      >
        {/* 아바타 이미지 */}
        <div className="w-16 h-16 mr-4 flex-shrink-0">
          <img
            src={`/${persona.image}`}
            alt={`${persona.name} 프로필 이미지`}
            // Tailwind 클래스에 동적 변수를 넣어 border 색상을 설정
            className={`rounded-full object-cover w-full h-full border-2 `}
          />
        </div>

        {/* 내용 영역 */}
        <div className="flex-grow min-w-0">
          <h2 className="text-xl font-semibold truncate">{persona.name}</h2>
          <p className="text-gray-500 dark:text-gray-400 truncate text-sm"></p>
        </div>

        {/* 마지막 대화 시간 */}
        <div className="flex-shrink-0 text-sm text-gray-400 dark:text-gray-500 ml-4">
          {}
        </div>
      </div>
    </Link>
  );
}
