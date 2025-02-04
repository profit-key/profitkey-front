FROM node:22.12-alpine AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json pnpm-lock.yaml* ./
RUN echo "corepack version => $(corepack --version)"
RUN corepack enable pnpm && pnpm i --frozen-lockfile


FROM node:22.12-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN corepack enable pnpm && pnpm run build


FROM nginx:latest

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY ./default.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]