"use client";

import { BackButton } from "@/app/_components";
import { PersonaContainer } from "@/app/chat-rooms/personas/_components";
import { SsgoiTransition } from "@ssgoi/react";
import { Suspense } from "react";

export default function PersonasPage() {
  return (
    <SsgoiTransition id="/chat-rooms/personas">
      <main className="dark:bg-gray-800 bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="border-b-1 pb-2 mb-6 border-gray-600">
          <BackButton />
        </div>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
              AI 페르소나 선택
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              대화하고 싶은 AI의 인격을 선택해주세요.
            </p>
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            <PersonaContainer />
          </Suspense>
        </div>
      </main>
    </SsgoiTransition>
  );
}
