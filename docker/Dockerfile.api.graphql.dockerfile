FROM node:18 as build-stage
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

COPY package.json .
COPY pnpm-lock.yaml .
COPY pnpm-workspace.yaml .
COPY tsconfig.json .

COPY api/graphql/package.json api/graphql/package.json

RUN pnpm --filter graphql-api install

COPY api/graphql api/graphql

RUN pnpm --filter graphql-api run build

WORKDIR /app/api/graphql

CMD [ "pnpm", "start:prod" ]