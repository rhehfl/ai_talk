"use client";

import Link from "next/link";
import { TbError404 } from "react-icons/tb";

export default function ChatErrorPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-6 py-24 text-center dark:bg-gray-900 sm:py-32 lg:px-8">
      <div className="text-center">
        <TbError404 className="mx-auto h-24 w-24 text-indigo-600 dark:text-indigo-400" />

        <p className="mt-4 text-base font-semibold text-indigo-600 dark:text-indigo-400">
          404
        </p>

        {/* 메인 헤더 */}
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-5xl">
          페이지를 찾을 수 없습니다
        </h1>

        {/* 설명 */}
        <p className="mt-6 text-base leading-7 text-gray-600 dark:text-gray-300">
          죄송합니다. 요청하신 페이지를 찾을 수 없거나 이동되었을 수 있습니다.
        </p>

        {/* 홈으로 가기 버튼 */}
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </main>
  );
}
