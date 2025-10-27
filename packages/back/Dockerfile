# ==================================
# STAGE 1: Build (빌드용 스테이지)
# 'builder'라는 별명을 붙입니다.
# ==================================
FROM node:22-alpine AS builder

# 2. 작업 디렉토리 설정
WORKDIR /usr/src/app

COPY .yarnrc.yml ./
COPY .yarn ./.yarn
# 3. 전체 모노레포의 package.json 파일들 복사
COPY package.json yarn.lock ./
COPY packages/common/package.json ./packages/common/
COPY packages/back/package.json ./packages/back/

# 4. Corepack 활성화 및 *모든* 의존성 설치 (devDependencies 포함)
RUN corepack enable
RUN yarn install

# 5. 소스 코드 복사
COPY packages/common/ ./packages/common/
COPY packages/back/ ./packages/back/

# 6. 백엔드 앱 빌드
RUN yarn workspace common build
RUN yarn workspace back build

# 7. 프로덕션용 의존성만 남기기 (Yarn 4+)
# devDependencies를 설치에서 제외시킵니다.
RUN yarn workspaces focus --all --production


# ==================================
# STAGE 2: Final (최종 배포용 스테이지)
# ==================================
# 완전히 새로운 경량 이미지에서 시작합니다.
FROM node:22-alpine
WORKDIR /usr/src/app
ENV NODE_ENV=production

# 1. 'builder' 스테이지에서 프로덕션 의존성 관련 파일만 복사
COPY --from=builder /usr/src/app/package.json ./
COPY --from=builder /usr/src/app/.yarnrc.yml ./

# --- ⬇️⬇️ 여기가 수정되었습니다 ⬇️⬇️ ---
# PnP 파일 대신 node_modules 디렉터리를 복사합니다.
COPY --from=builder /usr/src/app/node_modules ./node_modules
# --- ⬆️⬆️ 여기가 수정되었습니다 ⬆️⬆️ ---

# .yarn 폴더는 'yarn' 명령어를 실행하기 위해 여전히 필요합니다.
COPY --from=builder /usr/src/app/.yarn ./.yarn
COPY --from=builder /usr/src/app/packages/common/package.json ./packages/common/
COPY --from=builder /usr/src/app/packages/back/package.json ./packages/back/

# 2. 'builder' 스테이지에서 빌드된 결과물(dist)만 복사
COPY --from=builder /usr/src/app/packages/common/dist ./packages/common/dist
COPY --from=builder /usr/src/app/packages/back/dist ./packages/back/dist

# 8. 서버 실행 명령어 (동일)
CMD ["yarn", "workspace", "back", "start:prod"]