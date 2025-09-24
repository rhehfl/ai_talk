import { PersonaRepository } from "../repositories/personaRepository";

export class PersonaService {
  constructor(private personaRepository: PersonaRepository) {}

  public async setPersonaForSession(
    sessionId: string,
    personaId: string,
  ): Promise<string | null> {
    await this.personaRepository.setSessionPersona(sessionId, personaId);

    return personaId;
  }

  public async getPersonaForSession(sessionId: string) {
    //페르소나 id로 값 가져오기
    // return this.personaRepository.getSessionPersonaId(sessionId);
  }
}
