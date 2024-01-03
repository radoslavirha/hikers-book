FROM node:18-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable
RUN apt-get update && apt-get install -y build-essential python3

WORKDIR /app

COPY api api
COPY ui ui
COPY packages packages
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.json .

# INSTALL PRODUCTION DEPENDENCIES
FROM base AS prod-deps
RUN pnpm install --prod --frozen-lockfile

# BUILD EVERYTHING
FROM base AS build
RUN pnpm install --frozen-lockfile
RUN pnpm run -r build

# COPY PACKAGES
FROM base AS packages
LABEL maintainer="radoslav.irha@gmail.com"
ENV NODE_ENV production
ENV PORT 4000
EXPOSE 4000
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=prod-deps /app/packages /app/packages

# COMPLETE AUTHENTICATION API
FROM packages AS api-authentication
COPY --from=prod-deps /app/api/authentication/node_modules/ /app/api/authentication/node_modules
COPY --from=build /app/api/authentication/dist /app/api/authentication/dist
WORKDIR /app/api/authentication
CMD [ "pnpm", "start:prod" ]

# COMPLETE GRAPHQL API
FROM packages AS api-graphql
COPY --from=prod-deps /app/api/graphql/node_modules/ /app/api/graphql/node_modules
COPY --from=build /app/api/graphql/dist /app/api/graphql/dist
WORKDIR /app/api/graphql
CMD [ "pnpm", "start:prod" ]

# COMPLETE STAGES API
FROM packages AS api-stages
COPY --from=prod-deps /app/api/stages/node_modules/ /app/api/stages/node_modules
COPY --from=build /app/api/stages/dist /app/api/stages/dist
WORKDIR /app/api/stages
CMD [ "pnpm", "start:prod" ]

# COMPLETE TRIPS API
FROM packages AS api-trips
COPY --from=prod-deps /app/api/trips/node_modules/ /app/api/trips/node_modules
COPY --from=build /app/api/trips/dist /app/api/trips/dist
WORKDIR /app/api/trips
CMD [ "pnpm", "start:prod" ]

# COMPLETE HIKER'S BOOK UI
FROM nginx:1.25 AS ui-hikers-book
LABEL maintainer="radoslav.irha@gmail.com"
COPY --from=build /app/ui/hikers-book/dist/ /usr/share/nginx/html
COPY ./infra/docker/nginx/hikers-book.conf /etc/nginx/conf.d/default.conf