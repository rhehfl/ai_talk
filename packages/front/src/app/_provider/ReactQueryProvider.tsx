"use client";

import React from "react";
import {
  DehydratedState,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { HydrationBoundary } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ERROR_CODE } from "common";

function ReactQueryProvider({
  children,
  dehydratedState,
}: React.PropsWithChildren<{ dehydratedState?: DehydratedState }>) {
  const [client] = React.useState(
    new QueryClient({
      queryCache: new QueryCache({
        onError: (error) => {
          if (error.message === ERROR_CODE.UNAUTHORIZED)
            window.location.href = "/";
        },
      }),
      defaultOptions: {
        queries: {
          retry: 1,
          refetchOnWindowFocus: false,
        },
      },
    }),
  );

  return (
    <QueryClientProvider client={client}>
      <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default ReactQueryProvider;
