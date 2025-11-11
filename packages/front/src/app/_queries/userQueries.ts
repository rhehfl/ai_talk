import { getMe } from "@/app/_asyncApis";
import { queryOptions } from "@tanstack/react-query";
import { Options } from "ky";

export const userQueries = {
  all: () => ["users"] as const,
  me: (options?: Options) =>
    queryOptions({
      queryKey: [...userQueries.all(), "me"] as const,
      queryFn: () => getMe(options),
      gcTime: Infinity,
      staleTime: Infinity,
    }),
};
