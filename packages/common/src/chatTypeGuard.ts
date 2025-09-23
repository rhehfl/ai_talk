import {
  C2sInit,
  C2sSendMessage,
  S2cBroadcastMessage,
  S2cHistory,
  S2cSessionCreated,
} from "./types/chat";

export const isC2sInit = (msg: any): msg is C2sInit => msg?.type === "C2S_INIT";

export const isC2sSendMessage = (msg: any): msg is C2sSendMessage =>
  msg?.type === "C2S_SEND_MESSAGE";

export const isS2cSessionCreated = (msg: any): msg is S2cSessionCreated =>
  msg?.type === "S2C_SESSION_CREATED";

export const isS2cHistory = (msg: any): msg is S2cHistory =>
  msg?.type === "HISTORY";

export const isS2cBroadcastMessage = (msg: any): msg is S2cBroadcastMessage =>
  msg?.type === "S2C_BROADCAST_MESSAGE";
