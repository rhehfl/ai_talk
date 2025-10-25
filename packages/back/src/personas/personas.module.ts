import { Module } from '@nestjs/common';
import { PersonasService } from '@/personas/personas.service';
import { PersonasController } from '@/personas/personas.controller';
import { PersonasRepository } from '@/personas/personas.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Personas } from '@/personas/personas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Personas])],
  controllers: [PersonasController],
  providers: [PersonasService, PersonasRepository],
  exports: [PersonasService, PersonasRepository],
})
export class PersonasModule {}
