---
title: Theming
description: Gandalf UI follows the shadcn/ui headless theming model — CSS variables all the way down.
---

# Theming

Gandalf UI is **headless by design**. It follows the exact same theming model as [shadcn/ui](https://ui.shadcn.com/theming): every visual decision is driven by CSS custom properties, and the components themselves contain no hardcoded colors. Change a variable, everything updates.

Because Gandalf sits on top of shadcn, **any valid shadcn theme works out of the box**. There is no separate Gandalf theme format to learn.

---

## How it works

`@unergy/gandalf/styles.css` defines the same CSS variables `shadcn init` would write, with Gandalf's defaults. Components read them through Tailwind utility classes like `bg-background`, `text-foreground`, `border-border`, etc.

```css
/* Defined by @unergy/gandalf/styles.css — components read these directly */
:root {
  --background: #ffffff;
  --foreground: #314158;
  --primary: #2c2039;
  --primary-foreground: #ffffff;
  --muted: #f1f5f9;
  --muted-foreground: #45556c;
  --border: #e2e8f0;
  --ring: #c27aff;
  --radius: 0.5rem;
  /* ... */
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  /* ... */
}
```

To change them, declare your own values **after** importing Gandalf's stylesheet; the later declaration wins. Any shadcn theme generator works — [tweakcn](https://tweakcn.com), [v0](https://v0.dev), or the official [shadcn themes page](https://ui.shadcn.com/themes): paste its output below the import.

```css
@import 'tailwindcss';
@import '@unergy/gandalf/styles.css';

:root {
  --radius: 0.5rem;
  --primary: oklch(0.45 0.2 290);
}
```

---

## Shadcn variable reference

These are the variables every Gandalf component depends on:

| Variable | Usage |
|---|---|
| `--background` / `--foreground` | Page background and default text |
| `--primary` / `--primary-foreground` | Primary action color (buttons, active states) |
| `--secondary` / `--secondary-foreground` | Secondary surfaces |
| `--muted` / `--muted-foreground` | Subtle backgrounds and supporting text |
| `--accent` / `--accent-foreground` | Highlight surfaces (hover, focus) |
| `--destructive` / `--destructive-foreground` | Danger / error states |
| `--border` | Borders and dividers |
| `--input` | Form input borders |
| `--ring` | Focus ring color |
| `--radius` | Base border radius shared by all components |

---

## Gandalf semantic extensions

On top of the shadcn base, Gandalf adds a small set of **semantic state tokens** used by components like `GBadge` and `GAlert` to express feedback states. These are additive — they don't replace any shadcn variable.

| Token | Default | Meaning |
|---|---|---|
| `--color-action` | `blue-600` | Interactive / primary CTAs |
| `--color-information` | `purple-600` | Informational, brand accent |
| `--color-success` | `emerald-600` | Positive feedback |
| `--color-warning` | `amber-600` | Caution, pending |
| `--color-destructive` | shadcn `--destructive` | Errors, danger |
| `--color-default` | `slate-600` | Neutral / secondary |

Each token has three tiers — base, muted background, and bold hover:

```css
--color-success:        /* icon / text */
--color-success-muted:  /* light fill background */
--color-success-bold:   /* hover / pressed */
```

To override one:

```css
:root {
  --color-success:       var(--color-teal-600);
  --color-success-muted: var(--color-teal-100);
  --color-success-bold:  var(--color-teal-700);
}
```

---

## Border Radius

Corner sizes follow the scale in Figma (Foundations → Corner), which is Tailwind's default:

| Tailwind class | Value |
|---|---|
| `rounded-xs` | 2px |
| `rounded-sm` | 4px |
| `rounded-md` | 6px |
| `rounded-lg` | 8px |
| `rounded-xl` | 12px |
| `rounded-2xl` | 16px |
| `rounded-3xl` | 24px |
| `rounded-4xl` | 32px |

To change them, override the `--radius-*` variables after importing Gandalf's stylesheet. `--radius` (8px) is still read by a few shadcn primitives, such as Sonner toasts.

---

## Typography

Font stacks are CSS variables too:

```css
:root {
  --font-sans: 'Inter', ui-sans-serif, system-ui;
  --font-mono: ui-monospace, SFMono-Regular, Menlo;
}
```

Override with any font:

```css
@import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&display=swap');

:root {
  --font-sans: 'Geist', ui-sans-serif, system-ui;
}
```

---

## Dark Mode

Dark mode works exactly as shadcn documents it — via a `dark` class on `<html>`. Nuxt's `@nuxtjs/color-mode` module manages the toggle:

```ts
// nuxt.config.ts
modules: ['@nuxtjs/color-mode'],
colorMode: { classSuffix: '' },
```

```ts
const colorMode = useColorMode()
colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
```

No additional dark-mode configuration is needed for Gandalf components.
