import { PersonaRepository } from "../repositories/personaRepository";

export class PersonaService {
  constructor(private personaRepository: PersonaRepository) {}

  public async setPersonaId(
    personaId: number,
    sessionId: string,
  ): Promise<number | null> {
    await this.personaRepository.setSessionPersona(sessionId, personaId);
    return personaId;
  }

  public async getAllPersonas() {
    return this.personaRepository.getAllPersonas();
  }
}
