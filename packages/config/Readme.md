# Hiker's Book config files

This packages is no more than centralised config storage.

It uses [Hiker's Book Config CLI tool](../cli-tools/Readme.md#config-cli) for creating/merging config files.

You can find here one/two variants of single config. E.g. `ui.hikers-book.json` and `ui.hikers-book.template.json`. This approach allows configuring your development environment and keep correct config structure.

## Config

### .(json|env)

- Excluded from git
- Allows changing config values for local development (URL, port,...)
- Your values won't be overriden from template, only missing values will be added

### .template.(json|env)

- Included in git
- **Always up to date!** config structure with predefined variables for local development
- When new config value is introduced, change must be commited to this file.
- `hikers-book-config-cli` automatically merges missing value from template config to 'live' config

## Environment variables mapping

APIs uses [config](https://www.npmjs.com/package/config) module for loading configuration. [ENV variables mapping docs](https://github.com/node-config/node-config/wiki/Environment-Variables#custom-environment-variables).

It allows configuration with json file + ENV variables. There should be files mapping config structure with ENV variables for each API  => [docs](https://github.com/node-config/node-config/wiki/Environment-Variables#custom-environment-variables). ENV variables mapping file should be copied by [Hiker's Book Config CLI tool](../cli-tools/Readme.md#config-cli) to `config/custom-environment-variables.json` in each API.

Even when every ENV variable is defined, config json file must exist!
