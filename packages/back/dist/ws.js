"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const chatRepository_1 = require("./repositories/chatRepository");
const chatService_1 = require("./services/chatService");
const chatController_1 = require("./controllers/chatController");
const common_1 = require("common");
exports.default = (server) => {
    const wss = new ws_1.WebSocketServer({ server });
    const chatRepository = new chatRepository_1.ChatRepository();
    const chatService = new chatService_1.ChatService(chatRepository);
    const chatController = new chatController_1.ChatController(chatService);
    wss.on("connection", (ws) => {
        console.log("🚀 클라이언트 연결됨");
        ws.isInitialized = false; // 👈 연결 시 초기화 상태를 false로 설정
        ws.on("message", (data) => {
            try {
                const message = JSON.parse(data);
                // INIT 메시지는 항상 처리
                if ((0, common_1.isC2sInit)(message)) {
                    chatController.initialize(ws, message.payload.sessionId);
                    ws.isInitialized = true; // 👈 초기화 완료 후 상태를 true로 변경
                }
                // 👇 초기화가 완료된 클라이언트의 메시지만 처리
                else if (ws.isInitialized && (0, common_1.isC2sSendMessage)(message)) {
                    chatController.handleMessage(wss, ws, message.payload.content);
                }
                else if (!ws.isInitialized) {
                    console.warn("세션이 초기화되지 않은 클라이언트의 메시지를 무시합니다.");
                }
            }
            catch (error) {
                console.error("메시지 처리 중 오류:", error);
            }
        });
        ws.on("close", () => {
            chatController.disconnect(ws);
        });
        ws.on("error", console.error);
    });
};
//# sourceMappingURL=ws.js.map