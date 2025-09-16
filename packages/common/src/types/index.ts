export interface Message {
  id: string;
  author: string;
  content: string;
  timestamp: number;
  type: "INIT" | "MESSAGE" | "HISTORY" | "SESSION_CREATED";
  sessionId: string | null;
}
