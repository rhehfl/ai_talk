import { Metadata } from "next";

export const metadata: Metadata = {
  title: "개발 커피챗 | 도란도란",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
