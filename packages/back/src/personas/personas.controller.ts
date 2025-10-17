import { Controller, Get } from '@nestjs/common';
import { PersonasService } from '@/personas/personas.service';

@Controller('personas')
export class PersonasController {
  constructor(private readonly personasService: PersonasService) {}

  @Get()
  getAllPersonas() {
    console.log('asd');
    return this.personasService.getAllPersonas();
  }

  // @Post()
  // setPersona(@Req() req: Request, @Body('personaId') personaId: string) {
  //   const sessionId = req.cookies['chat_session_id'];
  //   if (!sessionId) {
  //     throw new UnauthorizedException('세션 ID가 없습니다.');
  //   }
  //   return this.personasService.setPersona(sessionId, parseInt(personaId, 10));
  // }
}
