import { Request, Response } from "express";
import { SessionService } from "../services/sessionService";

export class SessionController {
  constructor(private sessionService: SessionService) {}

  async createSession(req: Request, res: Response) {
    const newSessionId = await this.sessionService.createNewSession();
    res.status(201).json({ sessionId: newSessionId });
  }
}
