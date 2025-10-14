"use client";

import { externalApi } from "@/app/_libs";
import type { Message } from "common/src/types";

export const getChatRooms = async () => {
  const res = await externalApi
    .get(`api/chatrooms`)
    .json<Omit<Message, "prompt">[]>();
  return res;
};
