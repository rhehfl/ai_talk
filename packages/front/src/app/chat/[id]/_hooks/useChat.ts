"use client";

import { useCallback, useEffect, useState } from "react";
import { Message } from "common";
import { io, Socket } from "socket.io-client";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { getChatRoomHistory } from "@/app/_asyncApis";
import { chatRoomQueries } from "@/app/_queries";

export const useChat = (roomId?: number) => {
  const queryClient = useQueryClient();
  const { data: messages } = useSuspenseQuery(chatRoomQueries.history(roomId!));
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!roomId) return;
    const newSocket = io(process.env.NEXT_PUBLIC_WS_URL, {
      withCredentials: true,
      transports: ["websocket"],
      query: {
        roomId: roomId.toString(),
      },
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
    setSocket(newSocket);
    setIsLoading(true);
    newSocket.on("connect", () => {
      setIsConnected(true);
      setIsLoading(false);
    });
    newSocket.on("disconnect", (reason) => {
      setIsConnected(false);
      setIsLoading(false);
    });
    newSocket.on("message", (message: Message) => {
      console.log("Received message:", message);
      queryClient.setQueryData(
        ["chatRoomHistory", roomId],
        (oldData: Message[]) => {
          return [...oldData, message];
        },
      );
    });
    return () => {
      newSocket.close();
    };
  }, [roomId]);
  const sendMessage = useCallback(
    (content: string) => {
      if (!socket || !isConnected) {
        console.error("Socket is not connected. Cannot send message.");
        return;
      }
      const newMessage: Message = {
        author: "user",
        content,
      };

      socket.emit("message", newMessage);

      // 💡 사용자 메시지를 UI에 즉시 반영 (UX 향상)
      queryClient.setQueryData(
        ["chatRoomHistory", roomId],
        (oldData: Message[]) => {
          return [...oldData, newMessage];
        },
      );
    },
    [socket, isConnected],
  );
  return { messages, isConnected, isLoading, sendMessage };
};
