# Hiker's Book docker utils

## Dev environment services

Required for local development (redis, mongo)

```sh
docker compose up -d
```

## Build Hiker's Book containers

```sh
pnpm run docker:build
```

## Run Hiker's Book

Go to [K8s docs](../helm/Readme.md)
