import { Request, Response } from "express";
import { ChatRepository } from "../repositories/chatRepository";
import { v4 as uuidv4 } from "uuid";
import { SessionService } from "../services/sessionService";

export class SessionController {
  constructor(private sessionService: SessionService) {}

  public createSession = (req: Request, res: Response) => {
    console.log("Received sessionId:", req.body);
    const sessionId = req.body;

    if (sessionId) {
      res.status(201).json({ sessionId });
      return;
    }

    const newSessionId = this.sessionService.createNewSession();
    res.status(201).json({ sessionId: newSessionId });
  };
}
