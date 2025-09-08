import { WebSocketServer, WebSocket } from "ws";
import http from "http";
import { broadcastMessage } from "./handlers";
import { Message } from "common";
import { callGemini } from "./client";

export default (server: http.Server) => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    console.log("🚀 새로운 클라이언트가 연결되었습니다.");

    ws.on("message", (data) => {
      const message: Message = JSON.parse(data.toString());

      broadcastMessage(wss, message);
      callGemini(message.content).then((result) => {
        console.log(result.text);
      });
    });

    ws.on("close", () => {
      console.log("🔌 클라이언트 연결이 끊어졌습니다.");
    });

    ws.on("error", console.error);
  });
};
