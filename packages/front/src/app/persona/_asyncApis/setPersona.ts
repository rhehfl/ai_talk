import { Persona } from "common";

export const setPersona = async (personaId: number): Promise<Persona> => {
  const json = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/personas`,
    {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",

      body: JSON.stringify({ personaId }),
    },
  );
  const res = await json.json();
  return res;
};
