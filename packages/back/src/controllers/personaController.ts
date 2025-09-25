import { Request, Response } from "express";
import { PersonaService } from "../services/personaService";

export class PersonaController {
  constructor(private personaService: PersonaService) {}
  public setSessionPersona = async (req: Request, res: Response) => {
    const { sessionId, personaId } = req.body;

    if (!sessionId || !personaId) {
      return res
        .status(400)
        .json({ error: "sessionId and personaId are required." });
    }

    const result = await this.personaService.setPersonaForSession(
      sessionId,
      personaId,
    );

    if (!result) {
      return res
        .status(404)
        .json({ error: `Persona with id '${personaId}' not found.` });
    }

    res.status(200).json({
      message: "Persona successfully set for the session.",
      sessionId,
      personaId: result,
    });
  };
  public getPersona = async (req: Request, res: Response) => {
    const personas = await this.personaService.getAllPersonas();
    res.status(200).json(personas);
  };
}
