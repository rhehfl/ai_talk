import { createClient, RedisClientType } from "redis";

export class PersonaRepository {
  private client: RedisClientType;

  constructor() {
    this.client = createClient({
      url: process.env.REDIS_URL || "redis://localhost:6379",
    });
    if (!this.client.isOpen) {
      this.client.connect().catch(console.error);
    }
  }

  public async setSessionPersona(
    sessionId: string,
    personaId: string,
  ): Promise<void> {
    const key = `session_persona:${sessionId}`;
    await this.client.set(key, personaId);
  }

  public async getSessionPersonaId(sessionId: string): Promise<string | null> {
    const key = `session_persona:${sessionId}`;
    return this.client.get(key);
  }
  public async getAllPersonas() {
    return PERSONA_PROMPTS;
  }
}
