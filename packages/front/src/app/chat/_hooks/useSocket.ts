import { WEBSOCKET_URL } from "@/app/chat/_constants";
import { getSessionId, setSessionId } from "@/app/chat/_lib";
import { Message } from "common";
import { useEffect, useState } from "react";

export const useSocket = (url = WEBSOCKET_URL) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [error, setError] = useState<Event | null>(null);

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const ws = new WebSocket(url);
    ws.onopen = () => {
      const sessionId = getSessionId();
      ws.send(
        JSON.stringify({
          type: "INIT",
          sessionId: sessionId,
        }),
      );

      setSocket(ws);
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      const received: Message = JSON.parse(event.data);
      console.log(received);
      switch (received.type) {
        // 서버가 새로 발급해준 세션 ID를 저장
        case "SESSION_CREATED":
          setSessionId(received.sessionId);
          break;

        // 서버가 보내준 전체 대화 기록으로 교체
        case "HISTORY":
          setMessages(received.content);
          break;

        // 그 외에는 일반 채팅 메시지로 간주하고 목록에 추가
        default:
          setMessages((prevMessages) => [...prevMessages, received]);
          break;
      }
    };

    ws.onclose = () => {
      setIsConnected(false);
    };

    ws.onerror = (error) => {
      setIsConnected(false);
      setError(error);
    };

    return () => {
      ws.close();
    };
  }, [url]);

  return { isConnected, socket, error, messages, setMessages };
};
