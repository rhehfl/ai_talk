import Image from "next/image";
import Link from "next/link";
import MotionWrapper from "./_components/MotionWrapper"; // 방금 만든 Wrapper 컴포넌트
import { getPersona } from "@/app/persona/_asyncApis";

export default async function Home() {
  const personas = await getPersona();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-50 text-center overflow-x-hidden">
      <div className="max-w-4xl">
        <MotionWrapper>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900">
            당신의 개발 친구,
            <span className="text-indigo-600 block mt-2">
              코드 도란에서 만나보세요
            </span>
          </h1>
        </MotionWrapper>

        <MotionWrapper delay={0.2}>
          <p className="mt-6 text-lg md:text-xl text-gray-600">
            프론트엔드, 백엔드, 데브옵스 전문가 AI와 함께 커피챗을 나누며
            <br />
            성장의 다음 단계로 나아가세요.
          </p>
        </MotionWrapper>

        <MotionWrapper delay={0.4}>
          <div className="mt-12">
            <Link
              href="/persona"
              className="inline-block rounded-lg bg-indigo-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105"
            >
              지금 바로 대화 시작하기
            </Link>
          </div>
        </MotionWrapper>

        {personas.length > 0 && (
          <div className="mt-24">
            <MotionWrapper delay={0.6}>
              <h3 className="text-2xl font-bold text-gray-800">
                이런 멘토들과 대화할 수 있어요
              </h3>
            </MotionWrapper>

            <div className="mt-10 flex justify-center items-center gap-8 md:gap-12">
              {personas.map((persona, index) => (
                <MotionWrapper key={persona.id} delay={0.8 + index * 0.2}>
                  <div className="transform transition-transform duration-300 hover:scale-110">
                    <Image
                      className="rounded-full shadow-lg"
                      src={`/${persona.image}`}
                      alt={persona.description}
                      width={120}
                      height={120}
                      priority
                    />
                  </div>
                </MotionWrapper>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
