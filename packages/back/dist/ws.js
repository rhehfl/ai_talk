"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
// 8080 포트에서 웹소켓 서버를 생성합니다.
const wss = new ws_1.WebSocketServer({ port: 8080 });
console.log("✅ 서버가 8080 포트에서 시작되었습니다.");
// 'connection' 이벤트는 클라이언트가 연결될 때마다 발생합니다.
wss.on("connection", (ws) => {
    console.log("🚀 새로운 클라이언트가 연결되었습니다.");
    // 클라이언트로 환영 메시지를 보냅니다.
    ws.send("🎉 서버에 오신 것을 환영합니다!");
    // 'message' 이벤트는 클라이언트로부터 메시지를 수신할 때 발생합니다.
    ws.on("message", (message) => {
        console.log(`수신 메시지: ${message}`);
        // 받은 메시지를 그대로 클라이언트에게 되돌려 보냅니다 (에코).
        ws.send(`서버가 받은 메시지: ${message}`);
    });
    // 'close' 이벤트는 클라이언트 연결이 끊어졌을 때 발생합니다.
    ws.on("close", () => {
        console.log("🔌 클라이언트 연결이 끊어졌습니다.");
    });
    // 'error' 이벤트는 에러 발생 시 실행됩니다.
    ws.on("error", (error) => {
        console.error("에러 발생:", error);
    });
});
