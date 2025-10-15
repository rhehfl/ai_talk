"use client";

import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { postSession } from "@/app/chat-rooms/@modal/personas/_asyncApis";

export const useSession = () => {
  const { mutate: initializeSession } = useMutation({
    mutationFn: postSession,
  });

  useEffect(() => {
    initializeSession();
  }, []);
};
