import { useEffect } from "react";

export const useSession = () => {
  useEffect(() => {
    const fetchSession = async () => {
      const response = await fetch("/api/session", { method: "POST" });
      if (!response.ok) {
        throw new Error("Failed to get session from Next.js server");
      }
      const data = await response.json();
      return data.sessionId;
    };

    fetchSession();
  }, []);
};
