export interface Message {
  author: "user" | "Gemini";
  content: string;
}

export interface C2sInit {
  type: "C2S_INIT";
  payload: { sessionId: string | null };
}

export interface C2sSendMessage {
  type: "C2S_SEND_MESSAGE";
  payload: Message;
}

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
