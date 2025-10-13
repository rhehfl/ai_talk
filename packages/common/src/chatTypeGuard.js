"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isS2cBroadcastMessage = exports.isS2cComplete = exports.isS2cSessionCreated = exports.isC2sSendMessage = exports.isC2sInit = void 0;
const isC2sInit = (msg) => typeof msg === "object" &&
    msg !== null &&
    "type" in msg &&
    msg.type === "C2S_INIT";
exports.isC2sInit = isC2sInit;
const isC2sSendMessage = (msg) => typeof msg === "object" &&
    msg !== null &&
    "type" in msg &&
    msg.type === "C2S_SEND_MESSAGE";
exports.isC2sSendMessage = isC2sSendMessage;
const isS2cSessionCreated = (msg) => typeof msg === "object" &&
    msg !== null &&
    "type" in msg &&
    msg.type === "S2C_SESSION_CREATED";
exports.isS2cSessionCreated = isS2cSessionCreated;
const isS2cComplete = (msg) => typeof msg === "object" &&
    msg !== null &&
    "type" in msg &&
    msg.type === "S2C_INIT_COMPLETE";
exports.isS2cComplete = isS2cComplete;
const isS2cBroadcastMessage = (msg) => typeof msg === "object" &&
    msg !== null &&
    "type" in msg &&
    msg.type === "S2C_BROADCAST_MESSAGE";
exports.isS2cBroadcastMessage = isS2cBroadcastMessage;
//# sourceMappingURL=chatTypeGuard.js.map