import { parse } from "cookie";
import { Request } from "express";

export const getCookie = (req: Request, cookieName: string): string | null => {
  const cookieString = req.headers.cookie || "";
  const cookies = parse(cookieString);
  const cookieValue = cookies[cookieName];

  return cookieValue || null;
};
