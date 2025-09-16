import { ChatRepository } from "../repositories/chatRepository";
import { Message } from "common";
import { v4 as uuidv4 } from "uuid";

export class ChatService {
  constructor(private chatRepository: ChatRepository) {}

  public initializeSession(sessionId: string | null): {
    finalSessionId: string;
    isNew: boolean;
  } {
    if (sessionId === null) {
      sessionId = uuidv4();
      this.chatRepository.setHistory(sessionId, []);
    }

    if (sessionId && this.chatRepository.getHistory(sessionId)) {
      return { finalSessionId: sessionId, isNew: false };
    }
    const newSessionId = uuidv4();
    this.chatRepository.setHistory(newSessionId, []);
    return { finalSessionId: newSessionId, isNew: true };
  }

  public getHistory(sessionId: string): Message[] {
    return this.chatRepository.getHistory(sessionId) || [];
  }

  public async processMessage(
    sessionId: string,
    userMessage: Message,
  ): Promise<Message> {
    this.chatRepository.addMessage(sessionId, userMessage);

    // AI 호출 로직
    if (userMessage.content.includes("@gemini")) {
      const history = this.getHistory(sessionId);
      const prompt = history.map((h) => `${h.author}: ${h.content}`).join("\n");
    }

    return userMessage;
  }
}
