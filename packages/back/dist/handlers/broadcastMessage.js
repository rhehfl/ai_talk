"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.broadcastMessage = broadcastMessage;
function broadcastMessage(wss, message) {
    wss.clients.forEach((client) => {
        if (client.readyState === client.OPEN) {
            client.send(JSON.stringify(message));
        }
    });
}
//# sourceMappingURL=broadcastMessage.js.map