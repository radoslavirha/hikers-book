# Kubernetes

## Prerequisites

- Docker
- Kubernetes
- Ingress-Nginx
- Skaffold
- modified `/etc/hosts`
- label your node with `size=large`

## Install ingress-nginx

[Visit web](https://kubernetes.github.io/ingress-nginx/deploy/)

```sh
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.2/deploy/static/provider/cloud/deploy.yaml
```

## Install Skaffold

[Visit web](https://skaffold.dev)

## Modify /etc/hosts

Just append to `/etc/hosts`

```
127.0.0.1 hikers-book.dev.info
127.0.0.1 api.hikers-book.dev.info
```

## Label your node (MongoDB)

My node is `docker-desktop`:

```sh
kubectl get nodes
```

Then apply label

```sh
kubectl label nodes docker-desktop size=large
```

## Create folder for PersistentVolume

e.g. `/Users/radoslavirha/dev/irha/tmp/mongodb` or change `PersistentVolume.local.path` in `mongodb.yaml`

Set permissions on folder!

## Run cluster

1. Build containers

   ```sh
   cd infra/docker
   pnpm run docker:build
   ```

2. Start cluster (from root of this repo)

   ```sh
   skaffold dev
   ```

3. [Visit hikers-book.dev](hikers-book.dev)


## TODO

- MongoDB runs without auth.
- create config templates and substitute from something like variables.yaml & secret values
