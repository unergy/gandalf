# Gandalf UI — Copilot Instructions

Gandalf UI is a Nuxt 3 design system built on top of shadcn-nuxt and Reka UI. It is the internal component library for Unergy.

## Stack

- **Nuxt 4** (`nuxt ^4.4.2`) with `app/` directory layout
- **Tailwind CSS v4** via `@tailwindcss/vite` (no `tailwind.config.js`)
- **shadcn-nuxt** — `ui/` primitives live at `app/components/ui/`
- **Reka UI** — accessed only through `ui/` wrappers, never imported directly
- **CVA** (`class-variance-authority`) for all variant logic
- **TypeScript** throughout — no `any`, use `PrimitiveProps` from `reka-ui` for prop delegation
- **`@vueuse/core`** — use `reactiveOmit` for prop delegation in components
- Package manager: **bun**

## Commands

```bash
bun dev          # start dev server
bun build        # production build
bun format       # prettier
```

## Project layout

```
app/
  components/
    ui/           # shadcn primitives — NEVER EDIT
    gandalf/
      base/       # atomic G-components — wrap ui/, use CVA
      kit/        # composed components — only import from base/
    blocks/       # app-level compositions, no business logic
  layouts/
    docs.vue      # docs site layout + sidebar nav
  lib/
    utils.ts      # cn() helper
  assets/css/
    tailwind.css  # CSS variables + @theme inline
content/
  docs/           # Nuxt Content markdown pages
```

## Architecture rules (enforce strictly)

- `ui/` — never edit, never import from `reka-ui` directly anywhere else
- `gandalf/base/` — wraps `ui/`, uses CVA, named `G<Name>.vue`, exported from `index.ts`
- `gandalf/kit/` — only imports from `gandalf/base/`, never from `ui/`
- Blocks/features — only import from `gandalf/` layers
- **Violating layer boundaries is always wrong.**

## Theming model

Gandalf is headless — follows shadcn's CSS variable model exactly. Variables are in `tailwind.css` under `:root` / `.dark`. Gandalf adds semantic tokens on top:

- `--color-action`, `--color-information`, `--color-success`, `--color-warning`, `--color-destructive`, `--color-default`
- Each has `-muted` (fill) and `-bold` (hover) tiers
- Colors are OKLCH

## Adding a component to the sidebar

Edit the `navSections` array in `app/layouts/docs.vue`.
