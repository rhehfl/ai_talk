import { Request, Response } from "express";
import { PersonaService } from "../services/personaService";
import { parse } from "cookie";

export class PersonaController {
  constructor(private personaService: PersonaService) {}
  public setPersona = async (req: Request, res: Response) => {
    const cookieString = req.headers.cookie || "";
    const cookies = parse(cookieString);
    const sessionId = cookies.chat_session_id ?? "";
    const { personaId } = req.body;
    const result = await this.personaService.setPersona(personaId, sessionId);
    res.status(200).json({ personaId: result });
  };
  public getPersona = async (req: Request, res: Response) => {
    const personas = await this.personaService.getAllPersonas();
    res.status(200).json(personas);
  };
}
