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
    getHistory(sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.chatRepository.getHistory(sessionId)) || [];
        });
    }
    processMessage(ws, userMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            const sessionId = this.chatRepository.getSessionId(ws);
            console.log("Session ID:", sessionId);
            if (!sessionId)
                return null;
            this.chatRepository.addMessage(sessionId, {
                author: "user",
                content: userMessage,
            });
            const history = yield this.getHistory(sessionId);
            const geminiResponse = yield (0, client_1.callGemini)(history);
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
        });
    }
    endSession(ws) {
        this.chatRepository.removeClient(ws);
    }
}
exports.ChatService = ChatService;
