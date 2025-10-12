import { ChatRepository } from "../repositories/chatRepository";
import { v4 as uuidv4 } from "uuid";

export class SessionService {
  constructor(private chatRepository: ChatRepository) {}

  public async createNewSession() {
    const sessionId = uuidv4();
    return sessionId;
  }
}
