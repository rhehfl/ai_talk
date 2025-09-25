import { Persona } from "common";

export const getPersona = async (): Promise<Persona[]> => {
  const json = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/personas`,
    {
      method: "GET",
      cache: "no-store",
    },
  );
  const res = await json.json();
  return res;
};
