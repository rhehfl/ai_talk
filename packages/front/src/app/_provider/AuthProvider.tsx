import { userQueries } from "@/app/_queries";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { cookies } from "next/headers";
import { ReactNode } from "react";

export default async function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const cookieStore = await cookies();
  const queryClient = new QueryClient();

  const authToken = cookieStore.get("authToken")?.value;
  const chatSessionId = cookieStore.get("chat_session_id")?.value;

  const chatSessionIdHeaderValue = chatSessionId
    ? `chat_session_id=${chatSessionId}`
    : undefined;
  const authCookieHeaderValue = authToken
    ? `authToken=${authToken}`
    : undefined;

  const userQuery = userQueries.me({
    headers: {
      Cookie: [authCookieHeaderValue, chatSessionIdHeaderValue]
        .filter(Boolean)
        .join("; "),
    },
  });

  await queryClient.prefetchQuery(userQuery);
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
  );
}
