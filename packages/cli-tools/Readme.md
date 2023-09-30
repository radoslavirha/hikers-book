# Hiker's Book CLI tools

## Config CLI

Args:

- `-f` `--format` -> `json`|`dotenv` (default is `json`)
- `-s` `--source` -> path to source config (required)
- `-t` `--target` -> path to target config (required)

This CLI tool just creates `target` config file from `source` config file, or merges missing values to `target` from `source` in case `target` exists yet.
