import { ChatRepository } from "../repositories/chatRepository";
import { Message } from "common";

import { WebSocket } from "ws";
import { callGemini } from "../client";
import { PersonaRepository } from "../repositories/personaRepository";

export class ChatService {
  constructor(
    private chatRepository: ChatRepository,
    private personaRepository: PersonaRepository,
  ) {}

  public async initializeSession(ws: WebSocket, sessionId: string | null) {
    if (!sessionId) return;
    this.chatRepository.mapClientToSession(ws, sessionId);
  }

  public async getHistory(sessionId: string): Promise<Message[]> {
    return await this.chatRepository.getHistory(sessionId);
  }

  public async processMessage(ws: WebSocket, userMessage: string) {
    const sessionId = this.chatRepository.getSessionId(ws);
    if (!sessionId) return null;

    await this.chatRepository.addMessage(sessionId, {
      author: "user",
      content: userMessage,
    });
    const history = await this.getHistory(sessionId);
    const persona = await this.personaRepository.getSessionPersona(sessionId);
    if (!persona) return null;
    const geminiResponse = await callGemini(history, persona.prompt);
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
