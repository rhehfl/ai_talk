import { getMe } from "@/app/_asyncApis";
import { queryOptions } from "@tanstack/react-query";

export const userQueries = {
  all: () => ["users"] as const,
  me: () =>
    queryOptions({
      queryKey: [...userQueries.all(), "me"] as const,
      queryFn: () => getMe(),
    }),
};
