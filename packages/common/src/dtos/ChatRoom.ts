import { Persona } from "./Persona";

export interface ChatRoom {
  id: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  persona: Omit<Persona, "description" | "prompt">;
}
