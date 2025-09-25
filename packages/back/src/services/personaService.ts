import { PERSONA_PROMPTS } from "../constants/persona";
import { PersonaRepository } from "../repositories/personaRepository";

export class PersonaService {
  constructor(private personaRepository: PersonaRepository) {}

  public async setPersona(
    personaId: string,
    sessionId: string,
  ): Promise<string | null> {
    const persona = PERSONA_PROMPTS.find((p) => p.id.toString() === personaId);
    if (!persona) return null;

    await this.personaRepository.setSessionPersona(sessionId, personaId);
    return personaId;
  }

  public async getPersonaForSession(sessionId: string) {
    //페르소나 id로 값 가져오기
    // return this.personaRepository.getSessionPersonaId(sessionId);
  }
  public async getAllPersonas() {
    return this.personaRepository.getAllPersonas();
  }
}
