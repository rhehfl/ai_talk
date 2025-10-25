import { ThemeSwitcher } from "@/app/_components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "대화할 친구 선택하기 | 도란도란",
  description:
    "오늘 커피챗을 함께할 AI 개발 친구를 선택하세요. 각기 다른 개성과 전문 분야를 가진 친구들이 당신과의 기술적인 대화를 기다리고 있습니다.",
};

export default function PersonaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <ThemeSwitcher />
    </>
  );
}
