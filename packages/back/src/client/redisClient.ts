import { createClient, RedisClientType } from "redis";

export const redisClient: RedisClientType = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

export async function initializeRedisClient(): Promise<void> {
  redisClient.on("error", (err) =>
    console.error("🚨 REDIS CLIENT ERROR:", err),
  );

  try {
    await redisClient.connect();
    console.log("✅ Global Redis client connected successfully.");
  } catch (err) {
    console.error("❌ FATAL ERROR: Failed to connect to Redis!", err);
    process.exit(1);
  }
}
