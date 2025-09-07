import express from "express";
import http from "http";
import webSocketInitializer from "./ws"; // ws.ts 파일에서 export한 함수를 가져옴

const app = express();
const server = http.createServer(app);
const PORT = 8080;

webSocketInitializer(server);

app.get("/", (req, res) => {
  res.send("안녕하세요, Express 서버입니다!");
});

server.listen(PORT, () => {
  console.log(`✅ 서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
