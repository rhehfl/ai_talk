import { initializeRedisClient } from "./client";
import express from "express";
import http from "http";
import webSocketInitializer from "./ws";
import createApiRouter from "./routes"; // 👈 API 라우터 가져오기
import cors from "cors"; // 👈 CORS 미들웨어 가져오기

const app = express();
const server = http.createServer(app);
const PORT = 8080;

app.use(
  cors({
    origin: [
      "https://doran-doran.cloud",
      "https://www.doran-doran.cloud",
      "https://localhost:3000",
    ],
    credentials: true,
  }),
);

app.use(express.json());

async function startServer() {
  await initializeRedisClient();
}

startServer();
webSocketInitializer(server);

app.use("/api", createApiRouter());

app.get("/", (req, res) => {
  res.send("안녕하세요, Express 서버입니다!");
});

server.listen(PORT, () => {
  console.log(`✅ 서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
