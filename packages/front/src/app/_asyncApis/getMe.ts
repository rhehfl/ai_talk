import { externalApi } from "@/app/_libs";

export const getMe = async () => {
  return await externalApi.get("api/auth/me").json();
};
