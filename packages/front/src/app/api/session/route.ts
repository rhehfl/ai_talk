import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const SESSION_COOKIE_KEY = "chat_session_id";
const BACKEND_API_URL = "http://localhost:8080/api/sessions";

/**
 * 이 핸들러는 클라이언트의 세션 생성 요청을 받아 처리합니다.
 * 1. 쿠키 확인
 * 2. 없으면 백엔드에 새 세션 요청
 * 3. 받은 세션 ID를 쿠키에 저장하고, 클라이언트에도 반환
 */
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

  // API Route Handler의 응답 객체를 생성합니다.
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
