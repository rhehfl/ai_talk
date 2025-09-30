import ky from "ky";

export const externalApi = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  credentials: "include",
  cache: "no-store",
  headers: {
    "Content-Type": "application/json",
  },
});

export const internalApi = ky.create({
  credentials: "include",
  cache: "no-store",
  headers: {
    "Content-Type": "application/json",
  },
});
