import { Router } from "express";
import { PersonaRepository } from "../repositories/personaRepository";
import { redisClient } from "../client";
import { ChatRoomService } from "./../services/chatRoomService";
import { ChatRoomController } from "../controllers/chatRoomController";

const router = Router();
const personaRepository = new PersonaRepository(redisClient);
const chatRoomService = new ChatRoomService(personaRepository);
const chatRoomController = new ChatRoomController(chatRoomService);

router.get("/", chatRoomController.getChatRoomInfo.bind(chatRoomController));

export default router;
