import { WebSocketServer } from "ws";
import http from "http";
import { broadcastMessage } from "./handlers";
import { Message } from "common";
import { callGemini } from "./client";

export default (server: http.Server) => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    console.log("🚀 새로운 클라이언트가 연결되었습니다.");

    ws.on("message", async (data) => {
      const message: Message = JSON.parse(data.toString());
      const res = await callGemini(message.content);
      broadcastMessage(wss, {
        author: "AI",
        content: res.text || "",
        timestamp: 1234567890,
        id: Date.now().toString(),
      });
    });

    ws.on("close", () => {
      console.log("🔌 클라이언트 연결이 끊어졌습니다.");
    });

    ws.on("error", console.error);
  });
};
