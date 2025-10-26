"use client";

import { externalApi } from "@/app/_libs";
import type { Message } from "common/src/types";

export const getChatRoomHistory = async (roomId: number) => {
  const res = await externalApi
    .get(`api/chat/history`, { searchParams: { roomId } })
    .json<Omit<Message, "prompt">[]>();
  return res;
};
