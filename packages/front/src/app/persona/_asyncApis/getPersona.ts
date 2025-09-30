import { externalApi } from "@/app/_libs/api";
import { Persona } from "common";

export const getPersona = async (): Promise<Persona[]> => {
  const res = await externalApi(`api/personas`, {
    method: "GET",
    cache: "no-store",
  }).json<Persona[]>();
  return res;
};
