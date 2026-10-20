---
title: Installation
description: Gandalf UI components are installed exactly like shadcn — copy the source into your project, no package required.
---

# Installation

Gandalf UI follows the **shadcn/ui installation model**: components are source files you own, not a published package you import. You add each component to your project once, and it lives in your codebase alongside the rest of your code.

If you already have a project set up with **shadcn-nuxt**, skip straight to [step 3](#3-add-gandalf-components).

---

## 1. Set up shadcn-nuxt

Gandalf requires a working shadcn-nuxt setup. If you're starting fresh:

```bash
bun create nuxt my-app && cd my-app
bun add -D shadcn-nuxt
```

Add the module and Vite plugin to `nuxt.config.ts`:

```ts
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: ['shadcn-nuxt'],
  shadcn: {
    prefix: '',
    componentDir: './app/components/ui',
  },
  vite: {
    plugins: [tailwindcss()],
  },
  css: ['~/assets/css/tailwind.css'],
})
```

Run init. This writes the CSS variables into your stylesheet and scaffolds `app/lib/utils.ts` with `cn()`:

```bash
bunx shadcn-nuxt@latest init
```

That's it for the base setup — **Gandalf reads the same CSS variables shadcn generates**. Any theme you pick during init (or swap in later) works automatically. See [Theming](/docs/theming) for details.

---

## 2. Install peer dependencies

```bash
bun add class-variance-authority clsx tailwind-merge lucide-vue-next
```

These are the same dependencies shadcn components use.

---

## 3. Add Gandalf components

Gandalf components are copied into your project just like shadcn components. Each component lives in `app/components/gandalf/` and is a file you own and can edit.

### Using the CLI *(coming soon)*

```bash
bunx gandalf-ui add badge
bunx gandalf-ui add alert dialog
```

### Manually

Copy the component folder from the Gandalf repo into your project:

```
app/components/
  ui/              ← shadcn primitives (do not edit)
  gandalf/
    base/
      badge/       ← copy GBadge.vue + index.ts here
      alert/       ← copy GAlert.vue + index.ts here
    kit/
      checkbox-card/
```

Each folder exports a barrel `index.ts`. Component files follow the `G<Name>.vue` convention.

---

## 4. Use components

Import directly from the component folder:

```vue
<template>
  <GBadge color="success">Active</GBadge>
  <GAlert variant="outline" color="warning">Heads up</GAlert>
</template>

<script setup lang="ts">
import { GBadge } from '@/components/gandalf/badge'
import { GAlert } from '@/components/gandalf/alert'
</script>
```

Because these files live in your project, Nuxt's auto-import also picks them up — no explicit import needed if you prefer that.

---

## Requirements

| Dependency | Version |
|---|---|
| Nuxt | `^3.13` |
| Tailwind CSS | `^4.0` |
| shadcn-nuxt | `^0.11` |
| Reka UI | `^2.0` |
| class-variance-authority | `^0.7` |
| lucide-vue-next | `^0.400` |
