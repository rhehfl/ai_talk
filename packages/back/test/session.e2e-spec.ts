import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module'; // 전체 앱 모듈을 가져옵니다.

describe('SessionController (e2e)', () => {
  let app: INestApplication;

  // 모든 테스트가 시작되기 전 딱 한번만 실행됩니다.
  beforeAll(async () => {
    // 테스트용 NestJS 앱을 메모리에 생성합니다.
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // 모든 테스트가 끝난 후 딱 한번만 실행됩니다.
  afterAll(async () => {
    await app.close();
  });

  it('POST /session -> 세션 ID를 생성하고 쿠키를 설정해야 함', () => {
    return request(app.getHttpServer())
      .post('/session') // /session 경로에 POST 요청을 보냅니다.
      .expect(201) // HTTP 상태 코드가 201(Created)인지 확인합니다.
      .expect('set-cookie', /chat_session_id=.*;/); // 응답 헤더에 'chat_session_id' 쿠키가 있는지 정규식으로 확인합니다.
  });
});