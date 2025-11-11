import ky from "ky";
import { ERROR_CODE } from "common";
export const externalApi = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  credentials: "include",
  cache: "no-store",
  headers: {
    "Content-Type": "application/json",
  },
  hooks: {
    afterResponse: [
      async (request, options, response) => {
        if (response.statusText === ERROR_CODE.UNAUTHORIZED) {
          console.error("인증 에러 발생");
        }
      },
    ],
  },
});

export const internalApi = ky.create({
  prefixUrl: "/api",
  cache: "no-store",
  headers: {
    "Content-Type": "application/json",
  },
});
