---
title: Colors
description: The semantic color system used across all Gandalf components — tokens, tiers, and how to override them.
status: complete
---

# Colors

Gandalf extends the shadcn/ui color primitives with a semantic layer: a small set of **state tokens** that components use to express meaning (success, warning, destructive, etc.) without hardcoding Tailwind color classes.

::colors-preview
::

---

## Semantic color tokens

Each semantic color ships in three tiers optimized for different UI roles:

| Tier | Token pattern | Role |
|---|---|---|
| Base | `--color-{name}` | Icon color, text emphasis, outline borders |
| Muted | `--color-{name}-muted` | Light fill background (badges, alerts) |
| Bold | `--color-{name}-bold` | Hover / pressed state |

The six semantic colors and their default Tailwind mappings:

| Color | Base | Muted | Bold |
|---|---|---|---|
| `default` | `slate-600` | `slate-100` | `slate-700` |
| `action` | `blue-600` | `blue-100` | `blue-700` |
| `information` | `purple-600` | `purple-100` | `purple-700` |
| `success` | `emerald-600` | `emerald-100` | `emerald-700` |
| `warning` | `amber-600` | `amber-100` | `amber-700` |
| `destructive` | shadcn `--destructive` | `red-100` | `red-700` |

---

## Input surface tokens

The `bni-*` tokens define the visual surface for form inputs. They are separated from the shadcn `--input` / `--border` primitives so form controls can be restyled independently.

| Token | Default | Role |
|---|---|---|
| `--color-bni-background` | `white` | Input background fill |
| `--color-bni-border` | `slate-200` | Resting border |
| `--color-bni-border-loud` | `slate-500` | Hover / active border |
| `--color-bni-input` | `slate-100` | Inner fill (e.g. select trigger) |
| `--color-bni-ring` | `purple-400` | Focus ring |

---

## Base foreground hierarchy

A set of foreground tokens for expressing text hierarchy on the base surface:

| Token | Default | Role |
|---|---|---|
| `--color-base` | `slate-50` | Page surface |
| `--color-base-foreground` | `slate-700` | Primary text |
| `--color-base-foreground-loud` | `slate-800` | Emphasized text |
| `--color-base-foreground-quiet` | `slate-600` | Supporting text |
| `--color-base-foreground-extra-quiet` | `slate-400` | Placeholder / disabled text |

---

## Usage in components

Semantic colors are exposed as a `color` prop on components that support them:

```vue
<GBadge color="success">Active</GBadge>
<GBadge color="warning">Pending</GBadge>
<GBadge color="destructive">Error</GBadge>

<GAlert color="information" title="Note">
  This is an informational message.
</GAlert>
```

Internally, these components read the CSS variables through Tailwind utility classes (`bg-success-muted`, `text-success`, `text-success-bold`) — there are no hardcoded hex values.

---

## Overriding tokens

All tokens are plain CSS custom properties. Override them in your root stylesheet:

```css
:root {
  /* Change the success palette to teal */
  --color-success:       var(--color-teal-600);
  --color-success-muted: var(--color-teal-100);
  --color-success-bold:  var(--color-teal-700);

  /* Tighten the focus ring color */
  --color-bni-ring: var(--color-blue-500);
}
```

Dark-mode overrides follow the same pattern under `.dark`:

```css
.dark {
  --color-success:       var(--color-teal-400);
  --color-success-muted: oklch(0.25 0.05 180);
  --color-success-bold:  var(--color-teal-300);
}
```

> All semantic tokens live in `app/assets/css/tailwind.css` under the `@theme inline` block. The BNI tokens are defined there as well, and are light-mode only by default — add `.dark` overrides if your theme requires it.
