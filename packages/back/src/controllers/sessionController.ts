import { Request, Response } from "express";
import { SessionService } from "../services/sessionService";
import { parse } from "cookie";

export class SessionController {
  constructor(private sessionService: SessionService) {}

  public createSession = (req: Request, res: Response) => {
    const cookieString = req.headers.cookie || "";
    const cookies = parse(cookieString);
    const sessionId = cookies.chat_session_id ?? null;

    if (sessionId) {
      res.status(201).json({ sessionId });
      return;
    }

    const newSessionId = this.sessionService.createNewSession();
    res.status(201).json({ sessionId: newSessionId });
  };
}
