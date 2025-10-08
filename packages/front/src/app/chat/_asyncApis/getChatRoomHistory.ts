"use client";

import { externalApi } from "@/app/_libs";
import type { Message } from "common/src/types";

export const getChatRoomHistory = async () => {
  const res = await externalApi
    .get(`api/chatroom/history`)
    .json<Omit<Message, "prompt">[]>();
  return res;
};
