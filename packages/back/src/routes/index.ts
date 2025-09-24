import { Router } from "express";
import { SessionController } from "../controllers/sessionController";
import { ChatRepository } from "../repositories/chatRepository";
import { SessionService } from "../services/sessionService";

export default function createApiRouter(): Router {
  const router = Router();

  const chatRepository = new ChatRepository();
  const sessionService = new SessionService(chatRepository);
  const sessionController = new SessionController(sessionService);

  router.post("/sessions", sessionController.createSession);

  return router;
}
