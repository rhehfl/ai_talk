"use client";

import { useCallback, useEffect, useState } from "react";
import { Message } from "common";
import { io, Socket } from "socket.io-client";

export const useSocket = (roomId?: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
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
      setMessages((prev) => [...prev, message]);
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
      setMessages((prev) => [...prev, newMessage]);
    },
    [socket, isConnected],
  );
  return { messages, isConnected, setMessages, isLoading, sendMessage };
};
