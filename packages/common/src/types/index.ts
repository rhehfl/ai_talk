export interface Message {
  id: string;
  author: string;
  content: string;
  timestamp: number;
  sessionId: string | null;
}
