import { externalApi } from "@/app/_libs/api";

export const postSession = async (): Promise<string> => {
  const res = await externalApi("api/session", {
    method: "POST",
    cache: "no-store",
  }).json<string>();

  return res;
};
