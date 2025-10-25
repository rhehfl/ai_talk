import { externalApi } from "@/app/_libs/api";
import { Persona } from "common";

export const getAllPersonas = async (): Promise<Persona[]> => {
  const res = await externalApi(`api/personas`, {
    method: "GET",
    cache: "force-cache",
  }).json<Persona[]>();
  return res;
};
