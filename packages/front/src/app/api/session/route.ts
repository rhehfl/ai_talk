import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const SESSION_COOKIE_KEY = "chat_session_id";
const BACKEND_API_URL = "http://localhost:8080/api/sessions";

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  let sessionId = cookieStore.get(SESSION_COOKIE_KEY)?.value;
  let isNew = false;

  if (!sessionId) {
    try {
      const response = await fetch(BACKEND_API_URL, {
        method: "POST",
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Backend API call failed");
      }

      const data = await response.json();
      sessionId = data.sessionId;
      isNew = true;
    } catch (error) {
      console.error("Session creation failed:", error);
      return new Response("Failed to initialize session", { status: 500 });
    }
  }

  const response = NextResponse.json({ sessionId });

  // 만약 새로운 세션이었다면, 여기서 쿠키를 설정합니다.
  if (isNew && sessionId) {
    response.cookies.set(SESSION_COOKIE_KEY, sessionId, {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
    });
  }

  return response;
}
