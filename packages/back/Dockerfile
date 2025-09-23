# packages/back/Dockerfile

# 1. 베이스 이미지 설정
FROM node:18-alpine

# 2. 작업 디렉토리 설정
WORKDIR /usr/src/app

# 3. 전체 모노레포의 package.json 파일들 복사
COPY package.json yarn.lock ./
COPY packages/common/package.json ./packages/common/
COPY packages/back/package.json ./packages/back/

# 4. Corepack 활성화하여 프로젝트에 맞는 Yarn 버전 사용
RUN corepack enable

# 5. 의존성 설치 (프로덕션용)
RUN yarn install

# 6. 소스 코드 복사
COPY packages/common/ ./packages/common/
COPY packages/back/ ./packages/back/

# 7. 백엔드 앱 빌드
RUN yarn workspace back build

# 8. 서버 실행 명령어
CMD node packages/back/dist/server.js