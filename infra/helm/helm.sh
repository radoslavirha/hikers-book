#!/bin/bash
if [ "$1" = "" ]; then
  echo "Usage: $0 <environment>"
  exit 1
fi

if [[ $# -ne 1 ]]; then
  echo 'Too many arguments, expecting "local"' >&2
  exit 1
fi

case $1 in
    # LOCAL|WAHTEVER|WHATEVER ELSE
    local)  # Ok
        ;;
    *)
    # The wrong first argument.
    echo 'Expected "local"' >&2
    exit 1
esac

echo "Deploying to $1"
helm install hikers-book hikers-book -f hikers-book/environments/$1/values.yaml -f hikers-book/environments/$1/variables.yaml -f hikers-book/environments/$1/secrets.yaml