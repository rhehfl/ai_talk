export const getSessionId = async (sessionId?: string): Promise<string> => {
  const json = await fetch("http://localhost:8080/api/sessions", {
    method: "POST",
    cache: "no-store",
    body: JSON.stringify({ sessionId }),
  });
  console.log("fetch response:", json);
  const res = await json.json();
  return res;
};
