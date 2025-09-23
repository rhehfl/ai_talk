"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const uuid_1 = require("uuid");
const client_1 = require("../client");
class ChatService {
    constructor(chatRepository) {
        this.chatRepository = chatRepository;
    }
    initializeSession(ws, sessionId) {
        let finalSessionId = sessionId;
        let isNew = false;
        if (!finalSessionId) {
            isNew = true;
            finalSessionId = (0, uuid_1.v4)();
            this.chatRepository.setHistory(finalSessionId, []);
        }
        else if (!this.chatRepository.getHistory(finalSessionId)) {
            console.log("No history found for sessionId:", this.chatRepository.getHistory(finalSessionId));
            isNew = false;
            this.chatRepository.setHistory(finalSessionId, []);
        }
        this.chatRepository.mapClientToSession(ws, finalSessionId);
        return { finalSessionId, isNew };
    }
    async getHistory(sessionId) {
        return (await this.chatRepository.getHistory(sessionId)) || [];
    }
    async processMessage(ws, userMessage) {
        const sessionId = this.chatRepository.getSessionId(ws);
        console.log("Session ID:", sessionId);
        if (!sessionId)
            return null;
        this.chatRepository.addMessage(sessionId, {
            author: "user",
            content: userMessage,
        });
        const history = await this.getHistory(sessionId);
        const geminiResponse = await (0, client_1.callGemini)(history);
        const aiContent = geminiResponse.text;
        if (!aiContent) {
            return;
        }
        const aiMessage = {
            author: "Gemini",
            content: aiContent,
        };
        this.chatRepository.addMessage(sessionId, aiMessage);
        return aiMessage;
    }
    endSession(ws) {
        this.chatRepository.removeClient(ws);
    }
}
exports.ChatService = ChatService;
//# sourceMappingURL=chatService.js.map