"use strict";
// packages/back/src/controllers/chatController.ts
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
exports.ChatController = void 0;
class ChatController {
    constructor(chatService) {
        this.chatService = chatService;
    }
    initialize(ws, sessionId) {
        const { finalSessionId, isNew } = this.chatService.initializeSession(ws, sessionId);
        if (isNew) {
            const sessionMsg = {
                type: "S2C_SESSION_CREATED",
                payload: { sessionId: finalSessionId },
            };
            ws.send(JSON.stringify(sessionMsg));
        }
        const history = this.chatService.getHistory(finalSessionId);
        ws.send(JSON.stringify({ type: "HISTORY", content: history }));
    }
    handleMessage(wss, ws, content) {
        return __awaiter(this, void 0, void 0, function* () {
            const aiMessage = yield this.chatService.processMessage(ws, content);
            if (!aiMessage)
                return;
            const broadcastMsg = {
                type: "S2C_BROADCAST_MESSAGE",
                payload: aiMessage,
            };
            ws.send(JSON.stringify(broadcastMsg));
        });
    }
    disconnect(ws) {
        this.chatService.endSession(ws);
    }
}
exports.ChatController = ChatController;
