import { Request, Response } from "express";
import { PersonaService } from "../services/personaService";
import { getCookie } from "../utils/getCookie";

export class PersonaController {
  constructor(private personaService: PersonaService) {}
  public setPersona = async (req: Request, res: Response) => {
    const sessionId = getCookie(req, "chat_session_id");
    if (!sessionId)
      return res.status(401).json({ message: "세션이 존재하지 않습니다." });
    const { personaId } = req.body;
    const result = await this.personaService.setPersonaId(personaId, sessionId);
    res.status(200).json({ personaId: result });
  };
  public getPersona = async (req: Request, res: Response) => {
    const personas = await this.personaService.getAllPersonas();
    res.status(200).json(personas);
  };
}
