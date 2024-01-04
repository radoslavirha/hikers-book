https://github.com/nektos/act#configuration

Simulate release workflow

from root dir run

```sh
act -j release-please -s GITHUB_TOKEN=token -e .act/pr.json --container-architecture linux/amd64
act -j docker-build-push -s GITHUB_TOKEN=token -e .act/build.json --container-architecture linux/amd64
```
