"use client";

import { Ssgoi } from "@ssgoi/react";
import { drill, fade } from "@ssgoi/react/view-transitions";

const config = {
  defaultTransition: fade(),
  transitions: [
    {
      from: "/chat-rooms",
      to: "/chat-rooms/personas",
      transition: drill({
        direction: "enter",
        spring: { stiffness: 180, damping: 22 },
      }),
    },
    {
      from: "/chat-rooms/personas",
      to: "/chat-rooms",
      transition: drill({
        direction: "exit",
        opacity: true,
        spring: { stiffness: 180, damping: 22 },
      }),
    },
  ],
};

export default function SsgoiProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Ssgoi config={config}>
      <div
        style={{
          position: "relative",
          minHeight: "100vh",
          overflowX: "hidden",
        }}
      >
        {children}
      </div>
    </Ssgoi>
  );
}
