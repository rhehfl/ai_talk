import { WEBSOCKET_URL } from "@/app/chat/_constants";
import { useEffect, useState } from "react";
// import { Message } from "common"; // 👈 공용 타입을 사용하는 것이 좋습니다.

export const useSocket = (url = WEBSOCKET_URL) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [error, setError] = useState<Event | null>(null);

  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      setSocket(ws);
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      try {
        const newMessage = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      } catch (e) {
        console.error("메시지 파싱 에러:", e, "원본 데이터:", event.data);
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
