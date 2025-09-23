"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRepository = void 0;
const redis_1 = require("redis");
class ChatRepository {
    constructor() {
        this.wsToSessionId = new Map();
        this.client = (0, redis_1.createClient)({
            // Docker Compose 환경 변수를 사용하거나, 없으면 로컬 주소를 사용
            url: process.env.REDIS_URL || "redis://localhost:6379",
        });
        this.client.connect().catch(console.error);
        console.log("✅ Redis client connected");
    }
    // ... (나머지 코드는 이전 답변과 동일합니다) ...
    // --- Session과 WebSocket 매핑은 계속 메모리에 유지 ---
    mapClientToSession(ws, sessionId) {
        this.wsToSessionId.set(ws, sessionId);
    }
    getSessionId(ws) {
        return this.wsToSessionId.get(ws);
    }
    removeClient(ws) {
        this.wsToSessionId.delete(ws);
    }
    // --- 아래부터 Redis를 사용하는 비동기 메서드 ---
    setPersona(sessionId, personaId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.hSet("personas", sessionId, personaId);
        });
    }
    getPersona(sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const persona = yield this.client.hGet("personas", sessionId);
            return persona !== null && persona !== void 0 ? persona : undefined;
        });
    }
    getHistory(sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const key = `history:${sessionId}`;
            const historyJson = yield this.client.get(key);
            return historyJson ? JSON.parse(historyJson) : [];
        });
    }
    setHistory(sessionId, history) {
        return __awaiter(this, void 0, void 0, function* () {
            const key = `history:${sessionId}`;
            yield this.client.set(key, JSON.stringify(history));
        });
    }
    addMessage(sessionId, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const history = yield this.getHistory(sessionId);
            history.push(message);
            yield this.setHistory(sessionId, history);
        });
    }
}
exports.ChatRepository = ChatRepository;
