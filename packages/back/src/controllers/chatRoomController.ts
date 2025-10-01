import { Request, Response } from "express";
import { ChatRoomService } from "../services/chatRoomService";
import { parse } from "cookie";

export class ChatRoomController {
  constructor(private chatRoomService: ChatRoomService) {}

  public getChatRoomInfo = async (req: Request, res: Response) => {
    const cookieString = req.headers.cookie || "";
    const cookies = parse(cookieString);
    const sessionId = cookies.chat_session_id ?? "";

    if (!sessionId) {
      return res.status(401).json({ message: "세션이 존재하지 않습니다." });
    }

    try {
      const chatRoomInfo =
        await this.chatRoomService.getChatRoomInfo(sessionId);

      if (!chatRoomInfo) {
        return res
          .status(404)
          .json({ message: "채팅방 정보를 찾을 수 없습니다." });
      }

      res.status(200).json(chatRoomInfo);
    } catch (error) {
      console.error("채팅방 정보 조회 중 오류:", error);
      res.status(500).json({ message: "서버 내부 오류" });
    }
  };
}
