import { RedisClientType } from "redis";
import { PERSONA_PROMPTS } from "../constants/persona";

export class PersonaRepository {
  private client: RedisClientType;

  constructor(redisClient: RedisClientType) {
    this.client = redisClient;
  }

  public async setSessionPersona(
    sessionId: string,
    personaId: number,
  ): Promise<void> {
    const key = `session_persona:${sessionId}`;

    await this.client.set(key, personaId);
  }

  public async getSessionPersonaPrompt(
    sessionId: string,
  ): Promise<string | null> {
    const key = `session_persona:${sessionId}`;
    const personaId = await this.client.get(key);
    if (personaId === null) return null;
    const numberId = parseInt(personaId, 10);
    const persona = PERSONA_PROMPTS.find((p) => p.id === numberId);
    return persona?.prompt ?? null;
  }

  public async getPersonaId(sessionId: string) {
    const key = `session_persona:${sessionId}`;
    const personaId = await this.client.get(key);
    if (personaId === null) return null;
    return personaId;
  }

  public async getAllPersonas() {
    return PERSONA_PROMPTS.map((persona) => ({
      id: persona.id,
      image: persona.image,
      description: persona.description,
    }));
  }
}
