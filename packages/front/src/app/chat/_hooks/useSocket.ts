"use client";

import { useEffect, useState } from "react";
import { getSessionId, setSessionId } from "@/app/chat/_lib";
import {
  C2sInit,
  C2sSendMessage,
  isS2cBroadcastMessage,
  isS2cHistory,
  isS2cSessionCreated,
  Message,
} from "common";
import { WEBSOCKET_URL } from "@/app/chat/_constants";

export const useSocket = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const ws = new WebSocket(WEBSOCKET_URL);

    ws.onopen = () => {
      setIsConnected(true);
      setSocket(ws);
      const sessionId = getSessionId();
      const initMessage: C2sInit = {
        type: "C2S_INIT",
        payload: { sessionId },
      };
      ws.send(JSON.stringify(initMessage));
    };

    ws.onmessage = (event) => {
      const received = JSON.parse(event.data);

      if (isS2cSessionCreated(received)) {
        setSessionId(received.payload.sessionId);
      } else if (isS2cHistory(received)) {
        setMessages(received.content);
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
