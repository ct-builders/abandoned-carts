#!/usr/bin/env bash
# SPDX-License-Identifier: MIT
# Copyright (c) 2026 commercetools GmbH and the ct-builders contributors
# Freely available, AS IS and UNSUPPORTED. See LICENSE.

#
# The gate. Everything fast and self-contained that a deployment could
# break, run locally, because nothing runs this in CI.
#
#   ./scripts/predeploy.sh            all five applications
#   ./scripts/predeploy.sh mc-app     one of them
#
# It runs what Connect runs, in Connect's order: install from the lockfile,
# audit at high, typecheck, lint, build, tests. The audit is in here because
# Connect's SCA scan rejected this connector for exactly that and the report
# says only which stage failed — a five-minute round trip for a question
# `npm audit` answers in two seconds.
#
# Not in here: anything needing a running server, real credentials, or
# minutes rather than seconds. Those get their own deliberate command.

set -euo pipefail

cd "$(dirname "$0")/.."
ROOT="$PWD"

if [ "$#" -gt 0 ]; then APPS=("$@"); else
  APPS=(service job order-created-event mail-sender mc-app)
fi

failed=()

banner() { printf '\n\033[1m── %s ──\033[0m\n' "$1"; }

run() {
  local app=$1 label=$2
  shift 2
  if "$@"; then
    printf '  \033[32m✓\033[0m %s\n' "$label"
  else
    printf '  \033[31m✗\033[0m %s\n' "$label"
    failed+=("$app: $label")
  fi
}

# npm ci rather than npm install: a lockfile that no longer matches
# package.json installs fine locally and fails in Connect, which is the kind
# of failure this gate exists to catch before a deploy rather than after.
install() {
  local dir=$1
  if [ -d "$dir/node_modules" ]; then return 0; fi
  ( cd "$dir" && npm ci --silent )
}

# `mc-scripts build` resolves CUSTOM_APPLICATION_ID, ENTRY_POINT_URI_PATH,
# CLOUD_IDENTIFIER and APPLICATION_URL from the environment and exits on the
# first one it cannot find, so a clean clone cannot build until a .env
# exists. The checked-in example holds placeholders that compile; a real
# deployment takes these from the Connect deployment configuration, which
# overrides the file.
bootstrap_env() {
  local dir=$1
  if [ -f "$dir/.env" ] || [ ! -f "$dir/.env.example" ]; then return 0; fi
  cp "$dir/.env.example" "$dir/.env"
  printf '  created %s from .env.example\n' "${dir#$ROOT/}/.env"
}

for app in "${APPS[@]}"; do
  banner "$app"
  install "$ROOT/$app"
  bootstrap_env "$ROOT/$app"
  run "$app" audit sh -c "cd '$ROOT/$app' && npm audit --audit-level=high >/dev/null"

  case "$app" in
    service|job|order-created-event)
      run "$app" typecheck sh -c "cd '$ROOT/$app' && npx tsc --noEmit"
      run "$app" lint      sh -c "cd '$ROOT/$app' && npm run --silent lint"
      run "$app" build     sh -c "cd '$ROOT/$app' && npm run --silent build"
      if [ -d "$ROOT/$app/src/tests" ] || [ -d "$ROOT/$app/tests" ]; then
        run "$app" tests   sh -c "cd '$ROOT/$app' && npm test --silent"
      fi
      ;;
    mail-sender)
      run "$app" lint  sh -c "cd '$ROOT/$app' && npm run --silent lint"
      run "$app" tests sh -c "cd '$ROOT/$app' && npm run --silent test:unit"
      ;;
    mc-app)
      run mc-app lint  sh -c "cd '$ROOT/mc-app' && npx eslint src custom-application-config.mjs"
      run mc-app tests sh -c "cd '$ROOT/mc-app' && npx jest --config jest.test.config.js --silent"
      run mc-app build sh -c "cd '$ROOT/mc-app' && npx mc-scripts build >/dev/null"
      ;;
    *)
      echo "Unknown application: $app" >&2
      exit 2
      ;;
  esac
done

echo
if [ ${#failed[@]} -eq 0 ]; then
  printf '\033[32mPredeploy green.\033[0m\n'
else
  printf '\033[31mPredeploy failed:\033[0m\n'
  printf '  %s\n' "${failed[@]}"
  exit 1
fi
