FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable pnpm

# ---- Install deps ----
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY artifacts/api-server/package.json ./artifacts/api-server/
COPY artifacts/web/package.json ./artifacts/web/
COPY lib/api-client-react/package.json ./lib/api-client-react/
COPY lib/api-spec/package.json ./lib/api-spec/
COPY lib/api-zod/package.json ./lib/api-zod/
COPY lib/db/package.json ./lib/db/
COPY scripts/package.json ./scripts/
RUN pnpm install --frozen-lockfile

# ---- Build frontend ----
FROM base AS web-builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/artifacts/api-server/node_modules ./artifacts/api-server/node_modules
COPY --from=deps /app/artifacts/web/node_modules ./artifacts/web/node_modules
COPY . .
RUN pnpm --filter @workspace/web run build

# ---- Build API server ----
FROM base AS api-builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/artifacts/api-server/node_modules ./artifacts/api-server/node_modules
COPY --from=deps /app/lib/api-zod/node_modules ./lib/api-zod/node_modules
COPY --from=deps /app/lib/db/node_modules ./lib/db/node_modules
COPY . .
COPY --from=web-builder /app/artifacts/api-server/public ./artifacts/api-server/public
RUN pnpm --filter @workspace/api-server run build

# ---- Production image ----
FROM node:22-alpine AS runner
WORKDIR /app

RUN addgroup --system appgroup && adduser --system --ingroup appgroup appuser

COPY --from=api-builder /app/artifacts/api-server/dist ./dist
COPY --from=web-builder /app/artifacts/api-server/public ./public

USER appuser

EXPOSE 3000
ENV NODE_ENV=production
ENV PORT=3000

CMD ["node", "--enable-source-maps", "./dist/index.mjs"]
