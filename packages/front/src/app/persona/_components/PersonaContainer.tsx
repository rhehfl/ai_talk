'use client";';

import { getPersona } from "@/app/persona/_asyncApis";
import { PersonaCard } from "@/app/persona/_components";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function PersonaContainer() {
  const { data: personas } = useSuspenseQuery({
    queryFn: getPersona,
    queryKey: ["personas"],
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {personas.map((persona) => (
        <PersonaCard key={persona.id} persona={persona} />
      ))}
    </div>
  );
}
