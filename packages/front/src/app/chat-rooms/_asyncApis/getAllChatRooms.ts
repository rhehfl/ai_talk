'use client";';
import { externalApi } from "@/app/_libs";

export const getAllChatRooms = async () => {
  const res = await externalApi.get(`api/chatrooms`).json();
  return res;
};
