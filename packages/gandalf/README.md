# @unergy/gandalf

Unergy's design system: Vue 3 components built on [shadcn-vue](https://www.shadcn-vue.com/) and
[Reka UI](https://reka-ui.com/), styled with Tailwind CSS v4.

## Install

```bash
bun add @unergy/gandalf
```

Requires Vue `^3.5` and Tailwind CSS `^4`.

## Styles

Import Gandalf's stylesheet right after Tailwind, in the same CSS file. It brings the design tokens
and tells your Tailwind build to generate the classes Gandalf's components use.

```css
@import 'tailwindcss';
@import '@unergy/gandalf/styles.css';
```

Gandalf does not load a font. It expects Inter; load it however your app loads fonts (for example
`@nuxt/fonts`).

## Nuxt

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@unergy/gandalf/nuxt'],
  css: ['~/assets/css/main.css'], // the file with the two imports above
})
```

The module registers every `G*` component for auto-import and provides the SSR viewport width that
width-dependent composables need. Both can be turned off:

```ts
gandalf: {
  components: false, // no auto-import
  ssrWidth: 1280, // or false
}
```

## Vue

```vue
<script setup lang="ts">
import { GBadge, GKitDatePicker } from '@unergy/gandalf'
</script>

<template>
  <GBadge color="success">Active</GBadge>
</template>
```

## shadcn primitives

The shadcn-vue primitives Gandalf builds on are available one per path, for cases a `G*` component
does not cover yet:

```ts
import { Button } from '@unergy/gandalf/ui/button'
```

These are an escape hatch: they may change between minor versions. Prefer a `G*` component when one
exists.

Some primitives need a library you install only if you use them:

| Primitive      | Install                               |
| -------------- | ------------------------------------- |
| `ui/chart`     | `@unovis/vue` `@unovis/ts`            |
| `ui/form`      | `vee-validate`                        |
| `ui/carousel`  | `embla-carousel-vue` `embla-carousel` |
| `ui/drawer`    | `vaul-vue`                            |
| `ui/input-otp` | `vue-input-otp`                       |

## License

UNLICENSED. Internal to Unergy; not licensed for use outside the company.
