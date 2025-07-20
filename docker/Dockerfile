# syntax=docker/dockerfile:1
FROM node:24-slim AS base

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    dumb-init \
    && rm -rf /var/lib/apt/lists/* \
    && corepack enable \
    && corepack prepare pnpm@latest --activate

# Build stage
FROM base AS build

# Copy package files for dependency installation
COPY package.json pnpm-lock.yaml* ./

# Install dependencies with cache mount (increase Node.js memory)
RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    NODE_OPTIONS="--max-old-space-size=8192" pnpm install

# Copy source code
COPY . .

# Build the application
RUN pnpm build

# Production stage
FROM base AS production

# Copy built application from build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules ./node_modules

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:4321/ || exit 1

# Expose port
EXPOSE 4321

# Use dumb-init for proper signal handling
ENTRYPOINT ["dumb-init", "--"]
CMD ["pnpm", "preview"]
