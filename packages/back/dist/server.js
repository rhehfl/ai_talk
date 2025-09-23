"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const ws_1 = __importDefault(require("./ws")); // ws.ts 파일에서 export한 함수를 가져옴
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const PORT = 8080;
(0, ws_1.default)(server);
app.get("/", (req, res) => {
    res.send("안녕하세요, Express 서버입니다!");
});
server.listen(PORT, () => {
    console.log(`✅ 서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
//# sourceMappingURL=server.js.map