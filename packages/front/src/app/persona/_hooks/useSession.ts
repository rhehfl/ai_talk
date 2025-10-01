"use client";

import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { externalApi } from "@/app/_libs";

const createSession = async () => {
  await externalApi.post("api/sessions");
};

export const useSession = () => {
  const { mutate: initializeSession } = useMutation({
    mutationFn: createSession,
  });

  useEffect(() => {
    initializeSession();
  }, []);
};
