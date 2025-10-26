# 1. 베이스 이미지 설정
FROM node:22-alpine

# 2. 작업 디렉토리 설정
WORKDIR /usr/src/app

# 3. 전체 모노레포의 package.json 파일들 복사
COPY package.json yarn.lock ./
COPY packages/common/package.json ./packages/common/
COPY packages/back/package.json ./packages/back/

# 4. Corepack 활성화 및 의존성 설치
RUN corepack enable
RUN yarn install

# 5. 소스 코드 복사
COPY packages/common/ ./packages/common/
COPY packages/back/ ./packages/back/

# 6. 백엔드 앱 빌드
RUN yarn workspace common build
RUN yarn workspace back build



# 8. 서버 실행 명령어
CMD ["yarn", "workspace", "back", "start:prod"]
