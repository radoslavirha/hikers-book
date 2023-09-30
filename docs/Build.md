# Build containers

Docker commands must be run from root of this repository.

## UI

### Hiker's Book

Build:
`docker build -t radoslavirha/hikers-book-ui-hikers-book:latest . -f Dockerfile.ui`

Run:
`docker run -p 80:80 -v {path}/ui.hikers-book.json:/usr/share/nginx/html/config.json radoslavirha/hikers-book-ui-hikers-book:latest`

Push:
`docker push radoslavirha/hikers-book-ui-hikers-book:latest`
