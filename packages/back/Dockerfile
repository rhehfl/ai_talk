# ==================================
# STAGE 1: Build (빌드용 스테이지)
# ==================================
FROM node:22-alpine AS builder


WORKDIR /usr/src/app

COPY .yarnrc.yml ./
COPY .yarn ./.yarn

COPY package.json yarn.lock ./
COPY packages/common/package.json ./packages/common/
COPY packages/back/package.json ./packages/back/

RUN corepack enable
RUN yarn install

COPY packages/common/ ./packages/common/
COPY packages/back/ ./packages/back/

RUN yarn workspace common build
RUN yarn workspace back build

RUN yarn workspaces focus --all --production


# ==================================
# STAGE 2: Final (최종 배포용 스테이지)
# ==================================
# 완전히 새로운 경량 이미지에서 시작합니다.
FROM node:22-alpine
WORKDIR /usr/src/app
ENV NODE_ENV=production

COPY --from=builder /usr/src/app/package.json ./
COPY --from=builder /usr/src/app/.yarnrc.yml ./
COPY --from=builder /usr/src/app/yarn.lock ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/.yarn ./.yarn
COPY --from=builder /usr/src/app/packages/common/package.json ./packages/common/
COPY --from=builder /usr/src/app/packages/back/package.json ./packages/back/
COPY --from=builder /usr/src/app/packages/common/dist ./packages/common/dist
COPY --from=builder /usr/src/app/packages/back/dist ./packages/back/dist

# 8. 서버 실행 명령어 (동일)
CMD ["yarn", "workspace", "back", "start:prod"]