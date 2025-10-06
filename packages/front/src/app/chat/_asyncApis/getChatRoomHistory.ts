"use client";

import { externalApi } from "@/app/_libs";
import type { Persona } from "common/src/types";

export const getChatRoomInfo = async () => {
  const res =
    await externalApi(`api/chatroom/history`).json<Omit<Persona, "prompt">>();
  return res;
};
