import { Request, Response } from "express";
import { SessionService } from "../services/sessionService";
import { parse } from "cookie";

export class SessionController {
  constructor(private sessionService: SessionService) {}

  async createSession(req: Request, res: Response) {
    const cookieString = req.headers.cookie || "";
    const cookies = parse(cookieString);
    const sessionId = cookies.chat_session_id ?? "";

    if (sessionId)
      return res.status(200).json({ message: "Session already exists" });
    const newSessionId = await this.sessionService.createNewSession();
    res.cookie("chat_session_id", newSessionId, {
      httpOnly: true,
      path: "/",
      secure: true,
      sameSite: "none",
      // domain: ".doran-doran.cloud",
    });

    res.status(200).json({ message: "Session created successfully" });
  }
}
