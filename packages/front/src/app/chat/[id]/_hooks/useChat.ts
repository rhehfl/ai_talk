"use client";

import { useCallback, useEffect, useState } from "react";
import { Message } from "common";
import { io, Socket } from "socket.io-client";

interface UseChatOptions {
  onStream?: (chunk: string) => void;
  onStreamDone?: (fullText: string) => void;
  onStreamError?: (message: string) => void;
  onMessage?: (message: Message) => void;
  onSendComplete?: (message: Message) => void;
}

export const useChat = (roomId?: number, options?: UseChatOptions) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isAiThinking, setIsAiThinking] = useState(false);

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

    newSocket.on("disconnect", () => {
      setIsConnected(false);
    });

    newSocket.on("message", (message: Message) => {
      options?.onMessage?.(message);
      setIsAiThinking(false);
    });

    newSocket.on("ai-stream", (data: { text: string }) => {
      options?.onStream?.(data.text);
    });

    newSocket.on("ai-stream-done", (data: { fullText: string }) => {
      setIsAiThinking(false);
      options?.onStreamDone?.(data.fullText);
    });

    newSocket.on("ai-stream-error", (data: { message: string }) => {
      setIsAiThinking(false);
      options?.onStreamError?.(data.message);
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

      options?.onSendComplete?.(newMessage);
    },
    [socket, isConnected],
  );

  return { isConnected, socket, sendMessage, isAiThinking };
};
