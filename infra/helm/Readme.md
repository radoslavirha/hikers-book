# Kubernetes

## Prerequisites

- Docker
- Kubernetes
- Helm
- Ingress-Nginx
- modified `/etc/hosts`
- label your node with `size=large`

## Install Cert Manager

```sh
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.7.3/cert-manager.crds.yaml

kubectl apply -f https://gist.githubusercontent.com/t83714/51440e2ed212991655959f45d8d037cc/raw/7b16949f95e2dd61e522e247749d77bc697fd63c/selfsigned-issuer.yaml
```

## Install ingress-nginx

[Visit web](https://kubernetes.github.io/ingress-nginx/deploy/)

```sh
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.2/deploy/static/provider/cloud/deploy.yaml
```

## Install Helm

[Visit web](https://helm.sh/docs/intro/install/)

## Modify /etc/hosts

Just append to `/etc/hosts`

```sh
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

## Run cluster

### Environment prerequisites

Create keys for each environment

```sh
cd hikers-book/environments
cd {{ environment }}
mkdir keys
openssl genrsa -out keys/access.pem 2048 && openssl rsa -in keys/access.pem -outform PEM -pubout -out keys/access.pem.pub
openssl genrsa -out keys/refresh.pem 2048 && openssl rsa -in keys/refresh.pem -outform PEM -pubout -out keys/refresh.pem.pub
```

### Start

1. Build containers

   ```sh
   cd infra/docker
   pnpm run docker:build
   ```

2. Start

   ```sh
   cd infra/helm
   # LOCAL environment
   ./helm.sh local
   ```

3. [Visit hikers-book.dev.info](https://hikers-book.dev.info)

4. Stop

```sh
helm uninstall hikers-book
```

## TODO

- MongoDB runs without auth.
- solve copying environment configs and keys to helm chart directory
- Make ingress templates dynamic (now we have hardcoded services, url,...)
- JWT expire to Variables
