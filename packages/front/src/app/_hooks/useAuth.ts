import { userQueries } from "@/app/_queries";
import { useSuspenseQuery } from "@tanstack/react-query";

export const ussAuth = () => {
  const userQueryOption = userQueries.me();
  const { data: user } = useSuspenseQuery(userQueryOption);

  return user;
};
