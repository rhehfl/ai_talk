import { getAllPersonas } from "@/app/_asyncApis";
import { queryOptions } from "@tanstack/react-query";

export const personaQueries = {
  all: () => ["personas"] as const,
  list: () =>
    queryOptions({
      queryKey: [...personaQueries.all(), "lists"] as const,
      queryFn: () => getAllPersonas(),
    }),
};
