import { Router } from "express";
import { SessionController } from "../controllers/sessionController";
import { SessionService } from "../services/sessionService";
import { ChatRepository } from "../repositories/chatRepository";

const router = Router();

const chatRepository = new ChatRepository();
const sessionService = new SessionService(chatRepository);
const sessionController = new SessionController(sessionService);

router.post("/", sessionController.createSession.bind(sessionController));

export default router;
