import { createClient, RedisClientType } from "redis";

export const redisClient: RedisClientType = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

export async function initializeRedisClient(): Promise<void> {
  redisClient.on("error", (err) =>
    console.error("🚨 REDIS CLIENT ERROR:", err),
  );

  try {
    // 👈 연결 성공할 때까지 동기적으로 대기 (문제 해결의 핵심!)
    await redisClient.connect();
    console.log("✅ Global Redis client connected successfully.");
  } catch (err) {
    // 💥 연결 실패 시 로그를 남기고 강제 종료
    console.error("❌ FATAL ERROR: Failed to connect to Redis!", err);
    process.exit(1);
  }
}
