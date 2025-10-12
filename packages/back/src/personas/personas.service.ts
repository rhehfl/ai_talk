import { Injectable } from '@nestjs/common';
import { PERSONAS } from '@/constants/persona'; // old-back에서 constants 폴더를 복사해오세요.
import { PersonaRepository } from '@/personas/personas.repository';

@Injectable()
export class PersonasService {
  constructor(private readonly personaRepository: PersonaRepository) {}

  getAllPersonas() {
    return PERSONAS.map(({ prompt, ...rest }) => rest);
  }

  async setPersona(sessionId: string, personaId: number) {
    await this.personaRepository.setPersonaId(sessionId, personaId);
    const currentPersona = PERSONAS.find((p) => p.id === personaId);
    if (!currentPersona) {
      throw new Error('Persona not found');
    }
    const { prompt, ...rest } = currentPersona;
    return rest;
  }
}
