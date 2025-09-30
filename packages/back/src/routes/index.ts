import { Router } from "express";
import sessionRouter from "./session.router";
import personaRouter from "./persona.router";
import chatRoomRouter from "./chatRoom.router";

export default function createApiRouter(): Router {
  const router = Router();

  router.use("/sessions", sessionRouter);
  router.use("/personas", personaRouter);
  router.use("/chatroom", chatRoomRouter);

  return router;
}
