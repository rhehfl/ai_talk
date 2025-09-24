import { PersonaCard } from "@/app/persona/_components/PersonaCard";
import { PERSONA_PROMPTS } from "common";
import Link from "next/link";

export default function PersonasPage() {
  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800">AI 페르소나 선택</h1>
          <p className="mt-2 text-lg text-gray-600">
            대화하고 싶은 AI의 인격을 선택해주세요.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PERSONA_PROMPTS.map((persona) => (
            <Link key={persona.id} href={`/chat?personaId=${persona.id}`}>
              <PersonaCard persona={persona} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
