import { Persona } from "common";
interface PersonaCardProps {
  persona: Persona;
}

export function PersonaCard({ persona }: PersonaCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out h-full flex flex-col p-6 cursor-pointer">
      <div className="flex-grow">
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
          {persona.id}
        </h3>
        <p className="text-gray-600 text-base">{persona.id}</p>
      </div>
      <div className="mt-6 text-right">
        <span className="text-indigo-600 font-semibold hover:text-indigo-800">
          대화 시작하기 &rarr;
        </span>
      </div>
    </div>
  );
}
