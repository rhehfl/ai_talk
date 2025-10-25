export const RedisKey = {
  getRoomId(sessionId: string, personaId: number): string {
    return `${sessionId}:${personaId}`;
  },
  getRoomKey(roomId: string): string {
    return `room:${roomId}`;
  },
  getUserRoomsKey(sessionId: string): string {
    return `user:${sessionId}:rooms`;
  },
};
