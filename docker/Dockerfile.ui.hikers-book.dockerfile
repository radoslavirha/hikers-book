FROM node:18 as build-stage
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN pnpm install -g @angular/cli

WORKDIR /app

COPY package.json .
COPY pnpm-lock.yaml .
COPY pnpm-workspace.yaml .
COPY tsconfig.json .

COPY ui/hikers-book/package.json ui/hikers-book/package.json

RUN pnpm --filter hikers-book-ui install

COPY ui/hikers-book ui/hikers-book

RUN pnpm --filter hikers-book-ui run build

FROM nginx:1.25
COPY --from=build-stage /app/ui/hikers-book/dist/ /usr/share/nginx/html
COPY ./docker/nginx/hikers-book.conf /etc/nginx/conf.d/default.conf