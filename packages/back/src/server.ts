// packages/back/src/server.ts

import express from "express";
import http from "http";
import webSocketInitializer from "./ws";
import createApiRouter from "./routes"; // 👈 API 라우터 가져오기
import cors from "cors"; // 👈 CORS 미들웨어 가져오기

const app = express();
const server = http.createServer(app);
const PORT = 8080;

// --- 👇 빠진 미들웨어 설정 추가 ---

// 1. CORS 미들웨어: 다른 주소(localhost:3000)의 프론트엔드 요청을 허용합니다.
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// 2. JSON 파싱 미들웨어: POST 요청의 본문(body)을 JSON으로 파싱합니다.
app.use(express.json());

// --- 미들웨어 설정 끝 ---

webSocketInitializer(server);

// --- 👇 빠진 API 라우터 설정 추가 ---
// "/api"로 시작하는 모든 요청은 createApiRouter가 처리하도록 위임합니다.
app.use("/api", createApiRouter());
// --- 라우터 설정 끝 ---

app.get("/", (req, res) => {
  res.send("안녕하세요, Express 서버입니다!");
});

server.listen(PORT, () => {
  console.log(`✅ 서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
