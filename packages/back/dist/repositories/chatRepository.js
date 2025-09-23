"use strict";
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
    async setPersona(sessionId, personaId) {
        await this.client.hSet("personas", sessionId, personaId);
    }
    async getPersona(sessionId) {
        const persona = await this.client.hGet("personas", sessionId);
        return persona ?? undefined;
    }
    async getHistory(sessionId) {
        const key = `history:${sessionId}`;
        const historyJson = await this.client.get(key);
        return historyJson ? JSON.parse(historyJson) : [];
    }
    async setHistory(sessionId, history) {
        const key = `history:${sessionId}`;
        await this.client.set(key, JSON.stringify(history));
    }
    async addMessage(sessionId, message) {
        const history = await this.getHistory(sessionId);
        history.push(message);
        await this.setHistory(sessionId, history);
    }
}
exports.ChatRepository = ChatRepository;
//# sourceMappingURL=chatRepository.js.map