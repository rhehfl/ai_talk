import { Module } from '@nestjs/common';
import { PersonasService } from '@/personas/personas.service';
import { PersonasController } from '@/personas/personas.controller';
import { PersonaRepository } from '@/personas/personas.repository';

@Module({
  controllers: [PersonasController],
  providers: [PersonasService, PersonaRepository],
  exports: [PersonaRepository],
})
export class PersonasModule {}
