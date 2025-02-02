FROM node:22.12-alpine

RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY . .
RUN corepack enable pnpm && pnpm i --frozen-lockfile

RUN pnpm run build

CMD ["pnpm", "preview", "--host"]