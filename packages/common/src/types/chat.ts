export interface Message {
  author: "user" | "Gemini";
  content: string;
}

export interface ChatChunk {
  type: "CHAT_CHUNK";
  content: string;
}
