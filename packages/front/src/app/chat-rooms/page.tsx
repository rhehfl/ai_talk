import { externalApi } from "@/app/_libs";
import { SuspenseChatRoomList } from "@/app/chat-rooms/_components";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Link from "next/link";
import { cookies } from "next/headers";
import { chatRoomQueries } from "@/app/_queries";
import { SsgoiTransition } from "@ssgoi/react";
import { Header } from "@/app/_components";

export default async function ChatRoomsPage() {
  const queryClient = new QueryClient();
  const cookieStore = await cookies();

  const sessionToken = cookieStore.get("chat_session_id")?.value;
  const authToken = cookieStore.get("authToken")?.value;
  const cookieHeaderValue = sessionToken
    ? `chat_session_id=${sessionToken}`
    : undefined;
  const authCookieHeaderValue = authToken
    ? `authToken=${authToken}`
    : undefined;

  const chatRoomQuery = chatRoomQueries.list();

  await queryClient.prefetchQuery({
    queryKey: chatRoomQuery.queryKey,
    queryFn: () =>
      externalApi("api/chatrooms", {
        headers: {
          Cookie:
            cookieHeaderValue +
            (authCookieHeaderValue ? `; ${authCookieHeaderValue}` : ""),
        },
      }).json(),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <SsgoiTransition id="/chat-rooms" className="relative">
      <Header />
      <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">
            현재 채팅 목록
          </h1>
          <HydrationBoundary state={dehydratedState}>
            <SuspenseChatRoomList />
          </HydrationBoundary>
          <div className="pt-8 text-center ">
            <Link href="/chat-rooms/personas">
              <button
                className="py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full shadow-md transition duration-150
                         dark:bg-indigo-500 dark:hover:bg-indigo-600 cursor-pointer"
              >
                + 새로운 AI와 대화 시작하기
              </button>
            </Link>
          </div>
        </div>
      </div>
    </SsgoiTransition>
  );
}
