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
    console.log("Received personaId:", personaId, "sessionId:", sessionId);
    const result = await this.personaService.setPersona(personaId, sessionId);
    console.log(result);
    res.status(200).json({ personaId: result });
  };
  public getPersona = async (req: Request, res: Response) => {
    const personas = await this.personaService.getAllPersonas();
    console.log("Fetched personas:", personas);
    res.status(200).json(personas);
  };
}
