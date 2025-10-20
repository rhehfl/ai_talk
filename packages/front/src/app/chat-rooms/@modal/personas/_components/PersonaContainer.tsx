'use client";';

import { personaQueries } from "@/app/_queries/personaQueries";
import PersonaCard from "@/app/chat-rooms/@modal/personas/_components/PersonaCard";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function PersonaContainer() {
  const { data: personas } = useSuspenseQuery(personaQueries.list());

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {personas.map((persona) => (
        <PersonaCard key={persona.id} persona={persona} />
      ))}
    </div>
  );
}
