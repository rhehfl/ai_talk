import { PersonaRepository } from "../repositories/personaRepository";
import { PERSONA_PROMPTS } from "../constants/persona";
import { Persona } from "common";
import { ChatRepository } from "../repositories/chatRepository";

export class ChatRoomService {
  constructor(
    private personaRepository: PersonaRepository,
    private chatRepository: ChatRepository,
  ) {}

  /**
   * 세션 ID를 기반으로 현재 채팅방의 페르소나 정보를 가져옵니다.
   * @param sessionId - 사용자의 세션 ID
   * @returns 현재 페르소나의 상세 정보 또는 null
   */
  public async getChatRoomInfo(
    sessionId: string,
  ): Promise<Omit<Persona, "prompt"> | null> {
    const personaId = await this.personaRepository.getPersonaId(sessionId);
    if (!personaId) {
      return null;
    }

    const currentPersona = PERSONA_PROMPTS.find((p) => p.id === personaId);

    if (!currentPersona) {
      return null;
    }

    const { prompt: _, ...rest } = currentPersona;
    return rest;
  }

  public async getChatRoomHistory(sessionId: string) {
    const personaId = await this.personaRepository.getPersonaId(sessionId);
    if (!personaId) {
      throw new Error("페르소나 ID를 찾을 수 없습니다.");
    }
    const chatHistory = await this.chatRepository.getHistory(
      sessionId,
      personaId,
    );
    return { chatHistory };
  }
}
