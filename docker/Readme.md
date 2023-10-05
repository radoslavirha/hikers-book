# Hiker's Book docker utils

## Dev environment

`docker compose up -d`

## Build Hiker's Book containers

Just prepend package.json scripts with `VERSION=major.minor.patch`. Note that the Docker files are written as if they expect context at the root of this repository, `docker build` has path set to `../`

```sh
VERSION=latest pnpm run build:ui:hikers-book
```

## Run Hiker's Book containers

```sh
VERSION=latest pnpm run run:ui:hikers-book
```