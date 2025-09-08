import { WebSocketServer, WebSocket } from "ws";
import http from "http";
import { handleMessage } from "./handlers/messageHandler";

export default (server: http.Server) => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws: WebSocket) => {
    console.log("🚀 새로운 클라이언트가 연결되었습니다.");

    ws.on("message", (data: string) => {
      // 메시지 처리를 messageHandler에게 위임
      handleMessage(wss, data);
    });

    ws.on("close", () => {
      console.log("🔌 클라이언트 연결이 끊어졌습니다.");
    });

    ws.on("error", console.error);
  });
};
