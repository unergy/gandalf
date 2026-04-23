---
title: Theming
description: Customize Gandalf UI colors, radius, typography, and dark mode using CSS variables.
---

# Theming

Gandalf UI is styled entirely through CSS custom properties defined in `tailwind.css`. Changing a variable here cascades across every component automatically — no component code needs to change.

---

## CSS Variables

All tokens are defined inside `@theme inline {}` and `:root {}`. The `:root` block sets the light-mode values, and the `.dark` selector overrides them.

```css
/* tailwind.css */
:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --border: oklch(0.922 0 0);
  /* ... */
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  /* ... */
}
```

## Semantic Colors

Gandalf uses a semantic color palette on top of Tailwind's base colors. These map directly to components via CVA variant definitions.

| Token | Default | Usage |
|---|---|---|
| `--color-action` | `blue-600` | Primary CTAs, links, interactive elements |
| `--color-information` | `purple-600` | Informational states, brand accent |
| `--color-success` | `emerald-600` | Positive feedback, confirmation |
| `--color-warning` | `amber-600` | Caution, pending states |
| `--color-destructive` | `red-600` | Errors, deletions, danger |
| `--color-default` | `slate-600` | Neutral / secondary content |

Each semantic color has three tiers:

```css
--color-success:       /* Text and icon color */
--color-success-muted: /* Light background fill */
--color-success-bold:  /* Hover / pressed state */
```

### Overriding a color

To change the brand accent from purple to teal across the whole system:

```css
:root {
  --color-information: var(--color-teal-600);
  --color-information-muted: var(--color-teal-100);
  --color-information-bold: var(--color-teal-700);
}
```

---

## Border Radius

A single `--radius` variable drives all size variants:

```css
:root {
  --radius: 0.625rem; /* base */
}
```

Tailwind maps the derived values automatically:

| Class | Value |
|---|---|
| `rounded-sm` | `--radius - 4px` |
| `rounded-md` | `--radius - 2px` |
| `rounded-lg` | `--radius` |
| `rounded-xl` | `--radius + 4px` |

Set `--radius: 0` for a fully square UI, or `--radius: 1rem` for a rounder feel.

---

## Typography

The font stack is controlled by three variables:

```css
:root {
  --font-sans: 'Inter', ui-sans-serif, system-ui, ...;
  --font-mono: ui-monospace, SFMono-Regular, ...;
  --font-serif: ui-serif, Georgia, ...;
}
```

To use a custom font, import it from Google Fonts and override the variable:

```css
@import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&display=swap');

:root {
  --font-sans: 'Geist', ui-sans-serif, system-ui;
}
```

---

## Dark Mode

Dark mode is enabled via the `dark` class on `<html>`. Nuxt's `@nuxtjs/color-mode` module handles the toggle:

```ts
// nuxt.config.ts
modules: ['@nuxtjs/color-mode'],
colorMode: {
  classSuffix: '',
},
```

Toggle it in a component:

```ts
const colorMode = useColorMode()
colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
```

All Gandalf components respond to the `.dark` class automatically — no extra configuration required.

---

## Adding a custom theme

You can define multiple named themes by scoping variables under a class:

```css
.theme-ocean {
  --color-action: var(--color-cyan-600);
  --color-information: var(--color-blue-600);
  --primary: oklch(0.5 0.2 220);
}
```

Apply it on any container element:

```html
<div class="theme-ocean">
  <!-- components inside use the ocean palette -->
</div>
```
