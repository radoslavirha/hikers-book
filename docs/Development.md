# Development

## Prerequisites

- Node.js >= 18
- PNPm >= 8.7.0
- Angular CLI >= 16.2.1

## Installation

Install all the workspaces

```sh
pnpm install
```

## Build

Build all the workspaces

```sh
pnpm build
```

## Testing

Run tests in all the workspaces

```sh
pnpm test
```

## Eslint

Lint/format all the workspaces

```sh
pnpm lint
pnpm format
```

## New api/ui/package

Update files:

- `docker/Dockerfile` - create new `target` (only API/UI) - new Docker image
- `docker/docker-compose.hikers-book.build.yml` - create new service, `target` must match `target` from previous step (only API/UI) - local docker build
- `docker/docker-compose.hikers-book.yml` - create new service (only API/UI) - locally start containers, requires previous step
- `.github/workflows/release-please.yml` - update `jobs.docker.strategy.matrix.docker` (only API/UI) - set CI to build/push new images
- `release-please-config.json` - update `extra-files` - paths to package.json files for version bump
- `.github/labeler.yml` - PR labels (optional)
- `.github/pr-labeler.yml` - PR labels (optional)

