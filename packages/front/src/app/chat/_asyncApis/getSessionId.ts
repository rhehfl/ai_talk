export const getSessionId = async (): Promise<string> => {
  const json = await fetch("/api/session", {
    method: "POST",
    cache: "no-store",
  });
  const res = await json.json();
  return res;
};
