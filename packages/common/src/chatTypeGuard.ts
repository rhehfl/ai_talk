import {
  C2sInit,
  C2sSendMessage,
  S2cBroadcastMessage,
  S2cHistory,
  S2cSessionCreated,
} from "./types/chat";

export const isC2sInit = (msg: unknown): msg is C2sInit =>
  typeof msg === "object" &&
  msg !== null &&
  "type" in msg &&
  (msg as { type: unknown }).type === "C2S_INIT";

export const isC2sSendMessage = (msg: unknown): msg is C2sSendMessage =>
  typeof msg === "object" &&
  msg !== null &&
  "type" in msg &&
  (msg as { type: unknown }).type === "C2S_SEND_MESSAGE";

export const isS2cSessionCreated = (msg: unknown): msg is S2cSessionCreated =>
  typeof msg === "object" &&
  msg !== null &&
  "type" in msg &&
  (msg as { type: unknown }).type === "S2C_SESSION_CREATED";

export const isS2cHistory = (msg: unknown): msg is S2cHistory =>
  typeof msg === "object" &&
  msg !== null &&
  "type" in msg &&
  (msg as { type: unknown }).type === "HISTORY";

export const isS2cBroadcastMessage = (
  msg: unknown,
): msg is S2cBroadcastMessage =>
  typeof msg === "object" &&
  msg !== null &&
  "type" in msg &&
  (msg as { type: unknown }).type === "S2C_BROADCAST_MESSAGE";
