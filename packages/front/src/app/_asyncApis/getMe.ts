import { externalApi } from "@/app/_libs";
import { User } from "common";
import { Options } from "ky";

export const getMe = async (options?: Options) => {
  return await externalApi.get("api/auth/me", options).json<User>();
};
