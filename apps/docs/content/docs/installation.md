---
title: Installation
description: Install Gandalf UI from npm as @unergy/gandalf and add its styles to your Tailwind build.
---

# Installation

Gandalf UI is published on npm as **`@unergy/gandalf`**. Install it like any other dependency: no tokens, no `.npmrc`, no files to copy.

---

## 1. Install the package

```bash
bun add @unergy/gandalf
```

Your app needs **Vue `^3.5`** and **Tailwind CSS `^4`**. Gandalf brings everything else it needs (Reka UI, VueUse, CVA, Lucide…).

---

## 2. Add the styles

In the CSS file where you import Tailwind, import Gandalf's stylesheet right after it:

```css
@import 'tailwindcss';
@import '@unergy/gandalf/styles.css';
```

This adds Gandalf's design tokens (`:root` and `.dark` variables, semantic colors, typography utilities) and tells **your** Tailwind build to generate the classes Gandalf's components use. Both imports must be in the same file.

To change the theme, override the variables after the import. See [Theming](/docs/theming).

Gandalf does not load a font. It expects **Inter**; load it the way your app loads fonts. In Nuxt, `@nuxt/fonts` is the simplest option.

---

## 3a. Nuxt

Add the module:

```ts
// nuxt.config.ts
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: ['@unergy/gandalf/nuxt'],
  css: ['~/assets/css/main.css'], // the file from step 2
  vite: {
    plugins: [tailwindcss()],
  },
})
```

The module:

- Registers every `G*` component for auto-import, so templates can use `<GBadge>` without an `import`. Explicit imports keep working.
- Provides the viewport width that width-dependent composables need during SSR.

Both can be configured:

```ts
export default defineNuxtConfig({
  modules: ['@unergy/gandalf/nuxt'],
  gandalf: {
    components: false, // turn off auto-import
    ssrWidth: 1280, // default 1024; false to skip
  },
})
```

## 3b. Vue (without Nuxt)

Import components where you use them:

```vue
<script setup lang="ts">
import { GBadge } from '@unergy/gandalf'
</script>

<template>
  <GBadge color="success">Active</GBadge>
</template>
```

---

## 4. Use components

Every `G*` component, its variants (`gandalfBadgeVariants`…), its types and the `cn()` helper come from the package root:

```ts
import { GBadge, GKitDatePicker, cn } from '@unergy/gandalf'
import type { DatePickerModelValue, Option } from '@unergy/gandalf'
```

### shadcn primitives

When there is no `G*` component for what you need yet, the underlying shadcn-vue primitive is available one per path:

```ts
import { Button } from '@unergy/gandalf/ui/button'
import { Sheet, SheetContent } from '@unergy/gandalf/ui/sheet'
```

These are an escape hatch and may change between minor versions. Use the `G*` component once it exists.

A few primitives depend on a library that you install only if you use them:

| Primitive | Install |
|---|---|
| `ui/chart` | `@unovis/vue` `@unovis/ts` |
| `ui/form` | `vee-validate` |
| `ui/carousel` | `embla-carousel-vue` `embla-carousel` |
| `ui/drawer` | `vaul-vue` |
| `ui/input-otp` | `vue-input-otp` |

---

## Migrating from copied components

If your app has copies of `app/components/gandalf/` or `app/components/ui/` from before the package existed:

1. Install the package and add the styles (steps 1 and 2).
2. Remove the Gandalf tokens you copied into your CSS. Keep only the variables you override on purpose.
3. Replace the imports:
   - `@/components/gandalf/base/<name>` and `@/components/gandalf/kit/<name>` → `@unergy/gandalf`
   - `@/components/ui/<name>` → `@unergy/gandalf/ui/<name>`
4. Delete `app/components/gandalf/` and the primitives in `app/components/ui/` that the package now provides.
5. In Nuxt, add the module, and remove `shadcn-nuxt` if Gandalf was its only use.
6. Check the main screens visually.

If you had changed a copied component, bring the change to the Gandalf repo as a variant or a slot so every app gets it.

---

## Requirements

| Dependency | Version |
|---|---|
| Vue | `^3.5` |
| Tailwind CSS | `^4` |
| Nuxt (optional) | `^4` |
