import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

export const useSession = () => {
  useEffect(() => {
    const fetchSession = async () => {
      await fetch("/api/session", {
        method: "POST",
        cache: "no-store",
      });
    };
    fetchSession();
  }, []);
};
