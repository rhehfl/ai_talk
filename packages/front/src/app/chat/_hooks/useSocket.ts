"use client";

import { useEffect, useState } from "react";
import {
  C2sInit,
  C2sSendMessage,
  isS2cBroadcastMessage,
  isS2cComplete,
  Message,
} from "common";

interface UseSocketProps {
  initialMessages?: Omit<Message, "prompt">[];
}
export const useSocket = ({ initialMessages }: UseSocketProps) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<Message[]>(initialMessages || []);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const ws = new WebSocket(`${process.env.NEXT_PUBLIC_WS_URL}`);

    ws.onopen = () => {
      setIsConnected(true);
      setSocket(ws);
      const initMessage: C2sInit = {
        type: "C2S_INIT",
      };
      ws.send(JSON.stringify(initMessage));
    };

    ws.onmessage = (event) => {
      const received = JSON.parse(event.data);

      if (isS2cComplete(received)) {
        return;
      } else if (isS2cBroadcastMessage(received)) {
        setIsLoading(false);
        setMessages((prev) => [...prev, received.payload]);
      }
    };

    ws.onclose = () => {
      setIsConnected(false);
    };

    ws.onerror = (error) => {
      console.error("WebSocket Error:", error);
      setIsConnected(false);
    };

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = (content: string) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      const message: C2sSendMessage = {
        type: "C2S_SEND_MESSAGE",
        payload: { author: "user", content },
      };
      setIsLoading(true);
      socket.send(JSON.stringify(message));
      setMessages((prev) => [...prev, { content, author: "user" }]);
    }
  };

  return { messages, isConnected, sendMessage, setMessages, isLoading };
};
