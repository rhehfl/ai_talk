'use client";';
import { externalApi } from "@/app/_libs";
import { ChatRoom } from "common";

export const getAllChatRooms = async () => {
  const res = await externalApi.get(`api/chatrooms`).json<ChatRoom[]>();
  return res;
};
