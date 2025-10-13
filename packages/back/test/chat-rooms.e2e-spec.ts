import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { RedisService } from '@/core/redis/redis.service';
import { RedisKey } from '@/utils/redis-key.util';

describe('ChatRooms (E2E)', () => {
  let app: INestApplication;
  let redisService: RedisService;

  const mockSessionId = 'e2e-test-session-id';
  const mockPersonaId = 2;
  let createdRoomId: string = RedisKey.getRoomId(mockSessionId, mockPersonaId); // 생성된 채팅방 ID를 저장할 변수
  const mockCookie = `chat_session_id=${mockSessionId}`;

  beforeAll(async () => {
    // 실제 앱 모듈과 동일한 환경으로 테스트 모듈을 생성합니다.
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // 테스트 DB를 초기화하기 위해 RedisService 인스턴스를 가져옵니다.
    redisService = moduleFixture.get<RedisService>(RedisService);
  });

  // 각 테스트 케이스가 실행되기 전에 실행됩니다. (DB 초기화)
  beforeEach(async () => {
    // 테스트 간의 독립성을 보장하기 위해 Redis 데이터를 모두 지웁니다.
    const redisClient = redisService.getClient();
    await redisClient.flushAll();
  });

  // 모든 테스트가 끝난 후에 딱 한 번 실행됩니다.
  afterAll(async () => {
    await app.close();
  });

  it('1. [POST /chat-rooms] 새로운 채팅방을 생성한다', () => {
    return (
      request(app.getHttpServer())
        .post('/chat-rooms')
        // 실제 API처럼 헤더에 세션 ID를 담아서 보냅니다.
        .set('Cookie', mockCookie)
        .send({ personaId: mockPersonaId })
        .expect(201) // 201 Created 응답을 기대합니다.
        .then((res) => {
          // 응답 본문을 검증합니다.
          expect(res.body).toHaveProperty('roomId');
          expect(res.body.isNew).toBe(true);
          // 다음 테스트에서 사용하기 위해 생성된 roomId를 저장합니다.
          createdRoomId = res.body.roomId;
        })
    );
  });

  it('2. [GET /chat-rooms/mine] 내 채팅방 목록을 조회하고, 방금 만든 방이 포함되어 있는지 확인한다', async () => {
    // given: 첫 번째 테스트에서 방이 이미 생성된 상태

    // when & then
    return request(app.getHttpServer())
      .get('/chat-rooms/mine')
      .set('x-session-id', mockSessionId)
      .expect(200)
      .then((res) => {
        // 응답이 배열이고, 그 안에 생성된 roomId가 포함되어 있는지 확인합니다.
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body).toContain(createdRoomId);
      });
  });

  it('3. [DELETE /chat-rooms/:roomId] 생성했던 채팅방을 삭제한다', () => {
    // given: 첫 번째 테스트에서 방이 이미 생성된 상태

    // when & then
    return request(app.getHttpServer())
      .delete(`/chat-rooms/${createdRoomId}`)
      .set('x-session-id', mockSessionId)
      .expect(204); // 204 No Content 응답을 기대합니다.
  });

  it('4. [GET /chat-rooms/mine] 다시 내 채팅방 목록을 조회했을 때, 삭제된 방이 없는 것을 확인한다', async () => {
    // given: 세 번째 테스트에서 방이 삭제된 상태

    // when & then
    return request(app.getHttpServer())
      .get('/chat-rooms/mine')
      .set('x-session-id', mockSessionId)
      .expect(200)
      .then((res) => {
        // 응답이 빈 배열인지 확인합니다.
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body).not.toContain(createdRoomId);
        expect(res.body.length).toBe(0);
      });
  });
});
