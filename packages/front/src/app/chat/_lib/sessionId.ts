export const getSessionId = () => {
  return localStorage.getItem("chatSessionId");
};

export const setSessionId = (sessionId: string) => {
  localStorage.setItem("chatSessionId", sessionId);
};
