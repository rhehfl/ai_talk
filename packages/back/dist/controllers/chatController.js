"use strict";
// packages/back/src/controllers/chatController.ts
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
    async handleMessage(wss, ws, content) {
        const aiMessage = await this.chatService.processMessage(ws, content);
        if (!aiMessage)
            return;
        const broadcastMsg = {
            type: "S2C_BROADCAST_MESSAGE",
            payload: aiMessage,
        };
        ws.send(JSON.stringify(broadcastMsg));
    }
    disconnect(ws) {
        this.chatService.endSession(ws);
    }
}
exports.ChatController = ChatController;
//# sourceMappingURL=chatController.js.map