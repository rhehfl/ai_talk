import { externalApi } from "@/app/_libs/api";
import { Persona } from "common";

export const setPersona = async (personaId: number): Promise<Persona> => {
  const res = await externalApi(`api/personas`, {
    method: "POST",
    body: JSON.stringify({ personaId }),
  }).json<Persona>();
  return res;
};
