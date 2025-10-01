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
    res.cookie("sessionId", newSessionId, {
      httpOnly: true,
      path: "/",
      secure: true, // https 통신이므로 필수
      sameSite: "none", // 다른 도메인 간 통신이므로 필수
      domain: ".doran-doran.cloud", // 👈 이 부분을 추가해주세요!
    });

    res.status(200).json({ message: "Session created successfully" });
  }
}
