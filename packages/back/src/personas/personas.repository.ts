import { Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';
import { RedisService } from '@/core/redis/redis.service';
import { PERSONAS } from '@/constants/persona';
import { Persona } from 'common';

@Injectable()
export class PersonaRepository {
  private readonly redisClient: RedisClientType;

  constructor(private readonly redisService: RedisService) {
    this.redisClient = this.redisService.getClient();
  }

  async setPersonaId(sessionId: string, personaId: number): Promise<void> {
    await this.redisClient.set(`session:${sessionId}:persona`, personaId);
  }

  async getPersonaId(sessionId: string): Promise<string | null> {
    return this.redisClient.get(`session:${sessionId}:persona`);
  }

  public async getPersona(sessionId: string): Promise<Persona | null> {
    const key = `session:${sessionId}`;
    const personaId = await this.redisClient.get(key);
    if (personaId === null) return null;
    const numberId = parseInt(personaId, 10);

    const persona = PERSONAS.find((p) => p.id === numberId);
    return persona || null;
  }

  public async getAllPersonas() {
    return PERSONAS.map((persona) => ({
      id: persona.id,
      image: persona.image,
      description: persona.description,
    }));
  }
}
