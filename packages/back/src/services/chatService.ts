import { ChatRepository } from "../repositories/chatRepository";
import { Message } from "common";
import { v4 as uuidv4 } from "uuid";
import { WebSocket } from "ws";
import { callGemini } from "../client";

export class ChatService {
  constructor(private chatRepository: ChatRepository) {}

  public initializeSession(
    ws: WebSocket,
    sessionId: string | null,
  ): { finalSessionId: string; isNew: boolean } {
    let finalSessionId = sessionId;
    let isNew = false;

    if (!finalSessionId) {
      isNew = true;
      finalSessionId = uuidv4();
      this.chatRepository.setHistory(finalSessionId, []);
    } else if (!this.chatRepository.getHistory(finalSessionId)) {
      console.log(
        "No history found for sessionId:",
        this.chatRepository.getHistory(finalSessionId),
      );
      isNew = false;
      this.chatRepository.setHistory(finalSessionId, []);
    }

    this.chatRepository.mapClientToSession(ws, finalSessionId);
    return { finalSessionId, isNew };
  }
  public async getHistory(sessionId: string): Promise<Message[]> {
    return (await this.chatRepository.getHistory(sessionId)) || [];
  }

  public async processMessage(ws: WebSocket, userMessage: string) {
    const sessionId = this.chatRepository.getSessionId(ws);
    console.log("Session ID:", sessionId);
    if (!sessionId) return null;

    this.chatRepository.addMessage(sessionId, {
      author: "user",
      content: userMessage,
    });
    const history = await this.getHistory(sessionId);
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
