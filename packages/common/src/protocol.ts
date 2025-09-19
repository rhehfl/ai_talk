import { Message } from "./types";

// --- 클라이언트 -> 서버 (C2S) ---

export interface C2sInit {
  type: "C2S_INIT";
  payload: { sessionId: string | null };
}

export interface C2sSendMessage {
  type: "C2S_SEND_MESSAGE";
  payload: { content: string };
}

export type ClientToServerMessage = C2sInit | C2sSendMessage;

// --- 서버 -> 클라이언트 (S2C) ---

export interface S2cSessionCreated {
  type: "S2C_SESSION_CREATED";
  payload: { sessionId: string };
}

export interface S2cHistory {
  type: "HISTORY";
  content: Message[];
}

export interface S2cBroadcastMessage {
  type: "S2C_BROADCAST_MESSAGE";
  payload: Message;
}

export type ServerToClientMessage =
  | S2cSessionCreated
  | S2cHistory
  | S2cBroadcastMessage;

// --- 타입가드 ---

export const isC2sInit = (msg: any): msg is C2sInit => msg?.type === "C2S_INIT";
export const isC2sSendMessage = (msg: any): msg is C2sSendMessage =>
  msg?.type === "C2S_SEND_MESSAGE";

export const isS2cSessionCreated = (msg: any): msg is S2cSessionCreated =>
  msg?.type === "S2C_SESSION_CREATED";
export const isS2cHistory = (msg: any): msg is S2cHistory =>
  msg?.type === "HISTORY";
export const isS2cBroadcastMessage = (msg: any): msg is S2cBroadcastMessage =>
  msg?.type === "S2C_BROADCAST_MESSAGE";
