'use client";';

import { getPersona } from "@/app/persona/_asyncApis";
import { PersonaCard } from "@/app/persona/_components";
import { useSuspenseQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function PersonaContainer() {
  const { data: personas } = useSuspenseQuery({
    queryFn: getPersona,
    queryKey: ["personas"],
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {personas.map((persona) => (
        <Link key={persona.id} href={`/chat?personaId=${persona.id}`}>
          <PersonaCard persona={persona} />
        </Link>
      ))}
    </div>
  );
}
