import { Router } from "express";
import sessionRouter from "./session.router";
import personaRouter from "./persona.router";

export default function createApiRouter(): Router {
  const router = Router();

  router.use("/sessions", sessionRouter);
  router.use("/personas", personaRouter);

  return router;
}
