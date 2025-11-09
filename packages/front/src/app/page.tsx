import Image from "next/image";
import Link from "next/link";
import { FiCode, FiMessageSquare, FiTrendingUp } from "react-icons/fi";
import { Metadata } from "next";
import { getAllPersonas } from "@/app/_asyncApis";
import { SsgoiTransition } from "@ssgoi/react";

const Section = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <section className={`py-20 sm:py-32 ${className}`}>
    <div className="container mx-auto px-6 lg:px-8">{children}</div>
  </section>
);
export const metadata: Metadata = {
  title: "도란도란 | 당신의 AI 개발 친구와의 커피챗",
  description:
    "코딩하다 막힐 때, 기술적인 대화가 필요할 때, AI 개발 친구와 가볍게 커피챗을 나눠보세요. 여러 전문 AI가 당신의 이야기를 기다립니다.",
  keywords: [
    "AI",
    "개발자",
    "커피챗",
    "친구",
    "코딩",
    "프로그래밍",
    "기술 대화",
    "페어 프로그래밍",
  ],
  openGraph: {
    title: "도란도란 | AI 개발 친구와 나누는 기술 수다",
    description:
      "코딩하다 막힐 때, 기술적인 대화가 필요할 때, AI 개발 친구와 가볍게 커피챗을 나눠보세요.",
    images: [{ url: "/og-image.png" }],
  },
  verification: {
    google: "WarevXJVP2Z_N5SBMfbbvIDL5vC-7EnmYpJG8YC7CzQ",
  },
};

export default async function Home() {
  const personas = await getAllPersonas();

  const features = [
    {
      icon: <FiMessageSquare className="w-10 h-10 text-orange-400" />,
      title: "실시간 AI 커피챗 ☕",
      description:
        "코딩하다 막혔을 때, 사소한 궁금증이 생겼을 때! 언제든 AI 친구에게 편하게 말을 걸어보세요. 칼답은 기본!",
    },
    {
      icon: <FiCode className="w-10 h-10 text-green-400" />,
      title: "따끔따끔 코드 수다",
      description:
        '"이 코드.. 괜찮을까?" 혼자 끙끙 앓지 말고 AI 친구에게 보여주세요. 생각지 못한 꿀팁을 얻을지도 몰라요!',
    },
    {
      icon: <FiTrendingUp className="w-10 h-10 text-rose-400" />,
      title: "나만의 공부 페이스메이커",
      description:
        "뭘 공부해야 할지 막막하다면? AI 친구와 함께 나만의 학습 계획을 세우고 차근차근 레벨업 해봐요!",
    },
  ];

  return (
    <SsgoiTransition id="/">
      <main className="bg-slate-700 text-white ">
        {/* Hero Section: 첫 화면 (색상 수정) */}
        <div className="relative flex min-h-screen items-center overflow-hidden">
          <div className="container mx-20 px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-center md:text-left">
                <div>
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-400 animate-gradient-x">
                    <span className="block mt-3">
                      AI 개발 친구들과 도란도란 이야기
                    </span>
                  </h1>
                </div>
                <div>
                  <p className="mt-8 text-lg md:text-xl text-gray-300 max-w-lg mx-auto md:mx-0">
                    캐릭터들과 도란도란 진짜 개발자처럼 말하는 AI 친구들과 커피
                    한 잔 하는 느낌으로, 편하게 개발 이야기를 나누는 공간입니다.
                  </p>
                </div>
                <div>
                  <div className="mt-12">
                    <Link href="/chat-rooms">
                      <button className="cursor-pointer group relative inline-flex items-center justify-center overflow-hidden rounded-full p-0.5 text-lg font-semibold text-white shadow-lg transition-all duration-300 ease-in-out hover:scale-105 bg-gradient-to-r from-orange-500 to-amber-500">
                        <span className="absolute h-full w-full bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-500 ease-in-out group-hover:w-0"></span>
                        <span className="relative rounded-full bg-slate-900 px-8 py-4 transition-colors duration-300 group-hover:bg-transparent">
                          대화 시작하기!
                        </span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="relative w-full min-h-[50vh] lg:min-h-screen flex items-center justify-center">
                <div className="absolute my-20 inset-0 bg-gradient-to-r rounded-lg"></div>
                <Image
                  src="/herosection_main.png"
                  alt="도란도란 메인 캐릭터"
                  width={400}
                  height={400}
                  className="absolute object-contain shadow-2xl rounded-2xl  border-3 border-black transition-transform duration-300 ease-out hover:scale-105"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Feature Section: 서비스 핵심 기능 소개 (색상 수정) */}
        <Section className="bg-slate-700">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight">
              AI 친구들과 함께라면,{" "}
              <span className="text-orange-400">이런 재미가!</span>
            </h2>
            <p className="mt-4 text-gray-400 text-lg">
              혼자 끙끙 앓던 고민, 이제 함께 나눠요.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index}>
                <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 h-full transition-all duration-300 hover:border-orange-500/50 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/10">
                  <div className="mb-6">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Persona Section: 멘토 상세 소개 (색상 수정) */}
        {personas.length > 0 && (
          <Section className="bg-slate-700">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold tracking-tight">
                개성 만점!{" "}
                <span className="text-orange-400">
                  당신을 기다리는 AI 친구들
                </span>
              </h2>
              <p className="mt-4 text-gray-400 text-lg">
                프론트엔드, 백엔드, 데브옵스! 오늘은 누구랑 이야기해볼까요?
              </p>
            </div>
            <div className="space-y-20">
              {personas.map((persona, index) => (
                <div key={persona.id}>
                  <div
                    className={`flex flex-col md:flex-row items-center gap-12 ${index % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
                  >
                    <div className="w-full md:w-1/3 flex justify-center">
                      <div className="relative transition-transform duration-300 hover:scale-105">
                        <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 opacity-50 blur-xl"></div>
                        <Image
                          className="relative rounded-full shadow-2xl"
                          src={`/${persona.image}`}
                          alt={persona.description}
                          width={200}
                          height={200}
                          priority
                        />
                      </div>
                    </div>
                    <div className="w-full md:w-2/3 text-center md:text-left">
                      <h3 className="text-3xl font-bold mb-2">
                        {persona.name}
                      </h3>
                      <p className="text-orange-400 font-semibold text-lg mb-4">
                        {persona.description}
                      </p>
                      <p className="text-gray-300 leading-relaxed">
                        {persona.name === "이새봄" &&
                          "React, Next.js 전문가. 복잡한 개념도 레고 블록처럼 쉽게 설명해주는 긍정 에너지의 소유자! 사용자 경험(UX)을 가장 중요하게 생각하며, 반짝이는 아이디어를 현실로 만드는 과정을 함께합니다."}
                        {persona.name === "박진우" &&
                          'Java, Spring 기반의 안정적인 아키텍처 설계 전문가. "왜?"라는 질문을 통해 문제의 근본 원인을 파고들며, Trade-off를 고려한 최적의 해결책을 제시합니다. 화려함보다 기본의 가치를 중요하게 생각합니다.'}
                        {persona.name === "김서준" &&
                          "AWS, Kubernetes 기반 CI/CD 파이프라인 자동화 전문가. 귀찮고 반복적인 인프라 문제는 시원하게 해결해 드립니다! 최신 클라우드 기술과 개발 문화에 대한 유쾌한 대화를 나눠보세요."}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Final CTA Section: 마지막 행동 유도 (색상 수정) */}
        <Section>
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-12 text-center">
            <h2 className="text-4xl font-bold mb-4">
              자, 이제 누구랑 먼저 이야기해볼까요?
            </h2>
            <p className="text-orange-100 text-lg mb-8 max-w-2xl mx-auto">
              망설일 필요 없어요! 당신의 첫 개발 친구가 기다리고 있어요.
            </p>
            <Link href="/chat-rooms">
              <button className="rounded-full bg-white px-8 py-4 text-lg font-bold text-orange-600 shadow-lg transition-transform duration-300 hover:scale-105">
                대화 상대 고르러 가기
              </button>
            </Link>
          </div>
        </Section>
      </main>
    </SsgoiTransition>
  );
}
