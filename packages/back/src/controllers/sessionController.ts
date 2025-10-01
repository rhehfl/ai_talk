import { Request, Response } from "express";
import { SessionService } from "../services/sessionService";

export class SessionController {
  constructor(private sessionService: SessionService) {}

  async createSession(req: Request, res: Response) {
    const newSessionId = await this.sessionService.createNewSession();
    res.cookie("sessionId", newSessionId, {
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
    });
    res.status(200).json({ message: "Session created successfully" });
  }
}
