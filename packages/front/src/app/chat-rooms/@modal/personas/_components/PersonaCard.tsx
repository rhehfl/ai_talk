"use client";

import { postChatRoom } from "@/app/chat-rooms/_asyncApis";
import { useMutation } from "@tanstack/react-query";
import { Persona } from "common";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface PersonaCardProps {
  persona: Persona;
}

export default function PersonaCard({ persona }: PersonaCardProps) {
  const router = useRouter();
  const mutation = useMutation({ mutationFn: postChatRoom });

  const handleClick = () => {
    mutation.mutate(persona.id, {
      onSuccess: () => {
        router.push("/chat");
      },
    });
  };
  return (
    <button
      type="button"
      onClick={handleClick}
      className="bg-gray-100 dark:bg-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out h-full flex flex-col p-6 cursor-pointer"
    >
      <div>
        <Image
          className="rounded-full"
          src={`/${persona.image}`}
          alt={`캐릭터 이미지 ${persona.id}`}
          width={200}
          height={200}
        />
        <p>{persona.description}</p>
      </div>

      <div className="mt-6 text-right">
        <span className="text-indigo-600 font-semibold hover:text-indigo-800">
          대화 시작하기 &rarr;
        </span>
      </div>
    </button>
  );
}
