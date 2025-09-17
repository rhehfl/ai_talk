import { ChatRepository } from "../repositories/chatRepository";
import { Message } from "common";
import { v4 as uuidv4 } from "uuid";
import { WebSocket } from "ws";
import { callGemini } from "../client";

export class ChatService {
  constructor(private chatRepository: ChatRepository) {}

  public initializeSession(
    sessionId: string | null,
    ws: WebSocket,
  ): {
    finalSessionId: string;
    isNew: boolean;
  } {
    if (sessionId && this.chatRepository.getHistory(sessionId)) {
      return { finalSessionId: sessionId, isNew: false };
    }
    const newSessionId = uuidv4();
    this.chatRepository.setHistory(newSessionId, []);
    this.chatRepository.setSessionId(ws, newSessionId);

    return { finalSessionId: newSessionId, isNew: true };
  }

  public getHistory(sessionId: string): Message[] {
    return this.chatRepository.getHistory(sessionId) || [];
  }

  public async processMessage(ws: WebSocket, userMessage: string) {
    const sessionId = this.chatRepository.getSessionId(ws);
    console.log("Session ID:", sessionId);
    if (!sessionId) return null;

    this.chatRepository.addMessage(sessionId, {
      author: "user",
      content: userMessage,
    });
    const history = this.getHistory(sessionId) || [];
    const geminiResponse = await callGemini(history);
    const aiContent = geminiResponse.text;

    if (!aiContent) {
      return;
    }

    const aiMessage: Message = {
      author: "Gemini",
      content: aiContent,
    };

    this.chatRepository.addMessage(sessionId, aiMessage);

    return aiMessage;
  }
  public endSession(ws: WebSocket) {
    this.chatRepository.removeClient(ws);
  }
}
