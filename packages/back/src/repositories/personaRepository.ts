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
    const persona = PERSONA_PROMPTS.find((p) => p.id === personaId);
    await this.client.set(key, persona?.prompt ?? "");
  }

  public async getSessionPersonaPrompt(
    sessionId: string,
  ): Promise<string | null> {
    const key = `session_persona:${sessionId}`;
    const prompt = await this.client.get(key);
    return prompt;
  }
  public async getAllPersonas() {
    return PERSONA_PROMPTS.map((persona) => ({
      id: persona.id,
      image: persona.image,
      description: persona.description,
    }));
  }
}
