import { WebSocketServer, WebSocket } from "ws";
import http from "http";

export default (server: http.Server) => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws: WebSocket) => {
    console.log("🚀 새로운 클라이언트가 연결되었습니다.");

    ws.send("🎉 서버에 오신 것을 환영합니다!");

    ws.on("message", (message: string) => {
      console.log(`수신 메시지: ${message}`);

      // 모든 클라이언트에게 메시지 브로드캐스팅
      wss.clients.forEach((client) => {
        if (client.readyState === ws.OPEN) {
          client.send(`모두에게: ${message}`);
        }
      });
    });

    ws.on("close", () => {
      console.log("🔌 클라이언트 연결이 끊어졌습니다.");
    });

    ws.on("error", console.error);
  });
};
