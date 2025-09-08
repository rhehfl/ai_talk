import { WEBSOCKET_URL } from "@/app/chat/_constants";
import { useEffect, useState } from "react";

export const useSocket = (url = WEBSOCKET_URL) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [error, setError] = useState<Event | null>(null);

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      setSocket(ws);
      setIsConnected(true);
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
  }, []);

  return { isConnected, socket, error };
};
