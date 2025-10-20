"use client";

import { externalApi } from "@/app/_libs";
import type { ChatRoom, Persona } from "common";

export const getChatRoomInfo = async (id: number) => {
  const res = await externalApi.get(`api/chatrooms/${id}`).json<ChatRoom>();

  return res;
};
