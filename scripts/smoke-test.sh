#!/usr/bin/env bash
# Packs @unergy/gandalf and installs the tarball into each fixture, in a temp copy,
# so the library is tested exactly as an app would consume it from npm.
set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
work="$(mktemp -d)"
trap 'rm -rf "$work"' EXIT

(cd "$root/packages/gandalf" && bun run build >/dev/null && bun pm pack --destination "$work" --quiet >/dev/null)
mv "$work"/unergy-gandalf-*.tgz "$work/gandalf.tgz"

for fixture in "$root"/fixtures/*/; do
  name="$(basename "$fixture")"
  echo "▶ $name"
  cp -R "$fixture" "$work/$name"
  (cd "$work/$name" && npm install --silent --no-audit --no-fund && npm run build --silent && npm run check --silent)
done
