import ky from "ky";
import { ERROR_CODE } from "common";
export const externalApi = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  credentials: "include",
  cache: "no-store",
  headers: {
    "Content-Type": "application/json",
  },
  retry: 0,
  hooks: {
    afterResponse: [
      async (request, options, response) => {
        if (response.status === 500) {
          throw new Error("server error occurred");
        }
        if (
          response.status === 401 ||
          response.statusText === ERROR_CODE.UNAUTHORIZED
        ) {
          console.error("인증 에러 발생");
          throw new Error(ERROR_CODE.UNAUTHORIZED);
        }
        return response;
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
