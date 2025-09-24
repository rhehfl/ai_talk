import { Router } from "express";
import { PersonaController } from "../controllers/personaController";
import { PersonaRepository } from "../repositories/personaRepository";
import { PersonaService } from "../services/personaService";

const router = Router();
const personaRepository = new PersonaRepository();
const personaService = new PersonaService(personaRepository);
const personaController = new PersonaController(personaService);

router.post("/", personaController.setSessionPersona);

export default router;
