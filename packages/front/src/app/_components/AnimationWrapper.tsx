"use client";

import { type Transition, transition } from "@ssgoi/react";

interface AnimationWrapperProps {
  transitionOptions: Transition;
  children: React.ReactNode;
}
export default function AnimationWrapper({
  transitionOptions,
  children,
}: AnimationWrapperProps) {
  return <div ref={transition(transitionOptions)}>{children}</div>;
}
