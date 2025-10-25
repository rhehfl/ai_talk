import { Personas } from '@/personas/personas.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PersonasService {
  constructor(
    @InjectRepository(Personas)
    private personasRepository: Repository<Personas>,
  ) {}

  getAllPersonas() {
    return this.personasRepository.find({
      select: ['id', 'name', 'description', 'image'],
    });
  }
}
