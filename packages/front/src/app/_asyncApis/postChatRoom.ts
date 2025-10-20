"use client";

import { externalApi } from "@/app/_libs";
import type { Message } from "common/src/types";

export const postChatRoom = async (personaId: number) => {
  const res = await externalApi
    .post(`api/chatrooms`, { json: { personaId } })
    .json<Omit<Message, "prompt">[]>();
  return res;
};
