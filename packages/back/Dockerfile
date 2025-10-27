FROM node:22-alpine AS builder

# 2. 작업 디렉토리 설정
WORKDIR /usr/src/app

COPY .yarnrc.yml ./
COPY .yarn ./.yarn

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

# 7. (추가됨) 프로덕션용 의존성만 남기기 (Yarn 4+)
# devDependencies를 설치에서 제외시킵니다.
RUN yarn workspaces focus --all --production


# ==================================
# STAGE 2: Final (최종 배포용 스테이지)
# ==================================
# 완전히 새로운 경량 이미지에서 시작합니다.
FROM node:22-alpine
WORKDIR /usr/src/app
ENV NODE_ENV=production

# 1. (변경됨) 'builder' 스테이지에서 프로덕션 의존성 관련 파일만 복사
# (package.json, .yarnrc.yml, PnP 파일, 프로덕션용으로 정리된 .yarn 캐시)
COPY --from=builder /usr/src/app/package.json ./
COPY --from=builder /usr/src/app/.yarnrc.yml ./
COPY --from=builder /usr/src/app/.pnp.cjs ./
COPY --from=builder /usr/src/app/.pnp.loader.mjs ./
COPY --from=builder /usr/src/app/.yarn ./.yarn
COPY --from=builder /usr/src/app/packages/common/package.json ./packages/common/
COPY --from=builder /usr/src/app/packages/back/package.json ./packages/back/

# 2. (변경됨) 'builder' 스테이지에서 빌드된 결과물(dist)만 복사
COPY --from=builder /usr/src/app/packages/common/dist ./packages/common/dist
COPY --from=builder /usr/src/app/packages/back/dist ./packages/back/dist


CMD ["yarn", "workspace", "back", "start:prod"]