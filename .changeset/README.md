# Changesets

Every PR that changes `packages/gandalf` adds a changeset describing the change for the changelog:

```bash
bunx changeset
```

Pick the bump: `patch` for fixes, `minor` for new components or props, `major` for breaking changes to
props, slots or events (while on `0.x`, breaking changes go in a `minor`). On merge to `main`, the
release workflow opens a "Version Packages" PR; merging that PR publishes to npm.
