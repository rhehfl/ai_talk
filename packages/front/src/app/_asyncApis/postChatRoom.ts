"use client";

import { externalApi } from "@/app/_libs";
import { ChatRoom } from "common";

export const postChatRoom = async (personaId: number) => {
  const res = await externalApi
    .post(`api/chatrooms`, { json: { personaId } })
    .json<ChatRoom>();
  return res;
};
