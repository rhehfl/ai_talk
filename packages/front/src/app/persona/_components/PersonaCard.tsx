import { Persona } from "common";
import Image from "next/image";

interface PersonaCardProps {
  persona: Persona;
}

export function PersonaCard({ persona }: PersonaCardProps) {
  return (
    <div className="bg-gray-100 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out h-full flex flex-col p-6 cursor-pointer">
      <div>
        <Image
          className="rounded-full"
          src={`/${persona.image}`}
          alt={`캐릭터 이미지 ${persona.id}`}
          width={200}
          height={200}
        />
      </div>
      <div className="mt-6 text-right">
        <span className="text-indigo-600 font-semibold hover:text-indigo-800">
          대화 시작하기 &rarr;
        </span>
      </div>
    </div>
  );
}
