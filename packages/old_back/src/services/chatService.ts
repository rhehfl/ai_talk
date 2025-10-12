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
    const personaId = await this.personaRepository.getPersonaId(sessionId);
    if (!personaId) return [];
    return await this.chatRepository.getHistory(sessionId, personaId);
  }

  public async processMessage(ws: WebSocket, userMessage: string) {
    const sessionId = this.chatRepository.getSessionId(ws);
    if (!sessionId) return null;

    const persona = await this.personaRepository.getSessionPersona(sessionId);
    if (!persona) return null;

    await this.chatRepository.addMessage(sessionId, persona.id, {
      author: "user",
      content: userMessage,
    });
    const history = await this.getHistory(sessionId);

    const geminiResponse = await callGemini(history, persona.prompt);

    const aiMessage: Message = {
      author: "Gemini",
      content: geminiResponse,
    };

    this.chatRepository.addMessage(sessionId, persona.id, aiMessage);

    return aiMessage;
  }
  public endSession(ws: WebSocket) {
    this.chatRepository.removeClient(ws);
  }
}
