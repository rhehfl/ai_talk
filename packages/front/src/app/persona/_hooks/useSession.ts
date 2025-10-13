"use client";

import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { postSession } from "@/app/persona/_asyncApis/postSession";

export const useSession = () => {
  const { mutate: initializeSession } = useMutation({
    mutationFn: postSession,
  });

  useEffect(() => {
    initializeSession();
  }, []);
};
