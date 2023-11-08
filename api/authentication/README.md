# Hiker's Book Authentication API

## Getting started

```sh
# install dependencies
pnpm install

# serve
pnpm start

# build for production
pnpm build
pnpm start:prod
```

## Barrelsby

This project uses [barrelsby](https://www.npmjs.com/package/barrelsby) to generate index files to import the controllers.

Edit `.barreslby.json` to customize it:

```json
{
  "directory": [
    "./src/controllers/rest",
    "./src/controllers/pages"
  ],
  "exclude": [
    "__mock__",
    "__mocks__",
    ".spec.ts"
  ],
  "delete": true
}
```

## Authentication

### iCloud + nodemailer

[Apple help](https://support.apple.com/en-us/102654)

Generate your app-specific password. And set `nodemailer` in configuration json.

### Facebook

[Meta for developers](https://developers.facebook.com/apps/?show_reminder=true)

- create app
- set Use cases
  - `Allow people to log in with their Facebook account`
  - set `email` and `public_profile` in `Authentication and account creation`
- get `App ID` + `App secret` and set in configuration json

### GitHub

[GitHub Developer Settings](https://github.com/settings/developers)

- create app
- get `Client ID` + `Client secret` and set in configuration json
- set `Authorization callback URL`

### Google

[Google cloud console](https://console.cloud.google.com/apis/credentials)

- create app
- create `OAuth 2.0 Client IDs` `Credentials`
- get `Client ID` + `Client secret` and set in configuration json
- set `Authorized redirect URIs`
