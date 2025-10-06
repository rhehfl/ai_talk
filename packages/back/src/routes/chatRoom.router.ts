import { Router } from "express";
import { PersonaRepository } from "../repositories/personaRepository";
import { redisClient } from "../client";
import { ChatRoomService } from "./../services/chatRoomService";
import { ChatRoomController } from "../controllers/chatRoomController";
import { ChatRepository } from "../repositories/chatRepository";

const router = Router();
const chatRepository = new ChatRepository(redisClient);
const personaRepository = new PersonaRepository(redisClient);
const chatRoomService = new ChatRoomService(personaRepository, chatRepository);
const chatRoomController = new ChatRoomController(chatRoomService);

router.get("/", chatRoomController.getChatRoomInfo.bind(chatRoomController));

export default router;
