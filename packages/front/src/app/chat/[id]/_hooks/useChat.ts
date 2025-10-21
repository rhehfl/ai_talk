"use client";

import { useCallback, useEffect, useState } from "react";
import { Message } from "common";
import { io, Socket } from "socket.io-client";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { chatRoomQueries } from "@/app/_queries";

export const useChat = (roomId?: number) => {
  const queryClient = useQueryClient();
  const chatRoomQueryOption = chatRoomQueries.history(roomId!);
  const { data: messages } = useSuspenseQuery(chatRoomQueryOption);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const historyUpdater = (message: Message) => {
    queryClient.setQueryData(chatRoomQueryOption.queryKey, (oldData) => {
      if (oldData === undefined) {
        return [message];
      }
      return [...oldData, message];
    });
  };

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
      historyUpdater(message);
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
      console.log(123);
      const newMessage: Message = {
        author: "user",
        content,
      };
      socket.emit("message", newMessage);
      historyUpdater(newMessage);
    },
    [socket, isConnected],
  );
  return { messages, isConnected, isLoading, sendMessage };
};
