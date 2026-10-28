# Gandalf UI — Copilot Instructions

Gandalf UI is a Vue 3 design system built on top of shadcn-vue and Reka UI. It is the internal component library for Unergy, published to npm as `@unergy/gandalf`. This repo is a Bun workspace: the library in `packages/gandalf`, the Nuxt docs site in `apps/docs`.

## Stack

- **Vue 3** library built with Vite (`packages/gandalf/vite.config.ts`); docs site on **Nuxt 4**
- **Tailwind CSS v4** via `@tailwindcss/vite` (no `tailwind.config.js`)
- **shadcn-vue** — `ui/` primitives live at `packages/gandalf/src/components/ui/`
- **Reka UI** — accessed only through `ui/` wrappers, never imported directly
- **CVA** (`class-variance-authority`) for all variant logic
- **TypeScript** throughout — no `any`, use `PrimitiveProps` from `reka-ui` for prop delegation
- **`@vueuse/core`** — use `reactiveOmit` for prop delegation in components
- Package manager: **bun**

## Commands

```bash
bun dev               # build the library, then watch it and run the docs
bun run build         # build the library and the docs
bun run test:smoke    # pack the library and test it in fixtures/
bun format            # prettier
bunx changeset        # describe a library change for the changelog
```

## Project layout

```
packages/gandalf/        # @unergy/gandalf — `@/` points at src/
  src/
    components/
      ui/                # shadcn primitives — NEVER EDIT
      gandalf/
        base/            # atomic G-components — wrap ui/, use CVA
        kit/             # composed components — only import from base/
    lib/utils.ts         # cn() helper
    styles/tokens.css    # CSS variables + @theme inline
    styles/index.css     # published as @unergy/gandalf/styles.css
    nuxt/                # @unergy/gandalf/nuxt module
    index.ts             # public API — every G* component is exported here
apps/docs/
  app/
    components/blocks/   # docs-only compositions
    layouts/docs.vue     # docs site layout + sidebar nav
  content/docs/          # Nuxt Content markdown pages
fixtures/                # Vue and Nuxt apps for the smoke test
```

## Architecture rules (enforce strictly)

- `ui/` — never edit, never import from `reka-ui` directly anywhere else
- `gandalf/base/` — wraps `ui/`, uses CVA, named `G<Name>.vue`, exported from `index.ts`
- `gandalf/kit/` — only imports from `gandalf/base/`, never from `ui/`
- Blocks/features — only import from `gandalf/` layers
- **Violating layer boundaries is always wrong.**

## Theming model

Gandalf is headless — follows shadcn's CSS variable model exactly. Variables are in `packages/gandalf/src/styles/tokens.css` under `:root` / `.dark`. Gandalf adds semantic tokens on top:

- `--color-action`, `--color-information`, `--color-success`, `--color-warning`, `--color-destructive`, `--color-default`
- Each has `-muted` (fill) and `-bold` (hover) tiers
- Colors are OKLCH

## Adding a component to the sidebar

Edit the `navSections` array in `apps/docs/app/layouts/docs.vue`.
