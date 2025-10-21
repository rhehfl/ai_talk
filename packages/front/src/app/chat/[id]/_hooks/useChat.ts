"use client";

import { useCallback, useEffect, useState } from "react";
import { Message } from "common";
import { io, Socket } from "socket.io-client";
import { useQueryClient } from "@tanstack/react-query";
import { chatRoomQueries } from "@/app/_queries";

export const useChat = (roomId?: number) => {
  const queryClient = useQueryClient();
  const chatRoomQueryOption = chatRoomQueries.history(roomId!);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isAiThinking, setIsAiThinking] = useState(false);

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

    newSocket.on("connect", () => {
      setIsConnected(true);
    });

    newSocket.on("disconnect", (reason) => {
      setIsConnected(false);
    });

    newSocket.on("message", (message: Message) => {
      setIsAiThinking(false);
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
      setIsAiThinking(true);
      const newMessage: Message = {
        author: "user",
        content,
      };
      socket.emit("message", newMessage);
      historyUpdater(newMessage);
    },
    [socket, isConnected],
  );

  return { isConnected, isAiThinking, sendMessage };
};
