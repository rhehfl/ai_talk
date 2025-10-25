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
  const [streamingMessage, setStreamingMessage] = useState<string>(""); // 🌟

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

    newSocket.on("disconnect", () => {
      setIsConnected(false);
    });

    newSocket.on("message", (message: Message) => {
      setIsAiThinking(false);
      historyUpdater(message);
    });
    newSocket.on("ai-stream", (data: { text: string }) => {
      setStreamingMessage((prev) => prev + data.text);
    });

    // 🌟 2. 스트리밍 완료 수신
    newSocket.on(
      "ai-stream-done",
      (data: { fullText: string /* id, createdAt 등... */ }) => {
        setIsAiThinking(false); // AI 생각 종료
        setStreamingMessage(""); // 임시 스트리밍 텍스트 비우기

        // '완성된' AI 응답 메시지 객체 생성
        const finalAiMessage: Message = {
          author: "Gemini", // 또는 "ai"
          content: data.fullText,
          // ... (서버가 id, createdAt 등을 준다면 여기서 할당)
        };

        // '완성된' 메시지를 React Query 캐시에 저장
        historyUpdater(finalAiMessage);
      },
    );

    // 🌟 3. 스트리밍 오류 수신
    newSocket.on("ai-stream-error", (data: { message: string }) => {
      console.error("AI Stream Error:", data.message);
      setIsAiThinking(false); // AI 생각 종료
      // 사용자에게 에러를 보여주기 위해 streamingMessage state 활용
      setStreamingMessage(`[오류] ${data.message}`);
      // (참고: 잠시 후 이 메시지를 자동으로 지우는 로직을 추가할 수도 있습니다)
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

  return { isConnected, isAiThinking, sendMessage, streamingMessage };
};
