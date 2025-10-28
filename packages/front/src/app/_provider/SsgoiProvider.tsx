"use client";

import { Ssgoi } from "@ssgoi/react";
import { blind, drill, fade } from "@ssgoi/react/view-transitions";

const config = {
  transitions: [
    {
      from: "/",
      to: "/chat-rooms",
      transition: fade(),
      symmetric: true,
    },
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
    {
      from: "/chat-rooms",
      to: "/chat/*",
      transition: blind({
        staggerDelay: 10,
        transitionDelay: 20,
        blindCount: 5,
      }),
    },
    {
      from: "/chat-rooms/personas",
      to: "/chat/*",
      transition: blind({
        staggerDelay: 10,
        transitionDelay: 20,
        blindCount: 5,
      }),
    },
    {
      from: "/chat/*",
      to: "/chat-rooms",
      transition: fade(),
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
