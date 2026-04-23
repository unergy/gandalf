---
applyTo: "app/components/gandalf/**,content/docs/**"
---

## base/ component pattern

Two files per component — `G<Name>.vue` + `index.ts`:

```ts
// index.ts
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

export { default as GFoo } from './GFoo.vue'

export const gandalfFooVariants = cva('base-classes', {
  variants: { variant: { default: '', outline: '' } },
  defaultVariants: { variant: 'default' },
})
export type GandalfFooVariants = VariantProps<typeof gandalfFooVariants>
```

```vue
<!-- GFoo.vue -->
<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { Foo } from '@/components/ui/foo'
import { cn } from '@/lib/utils'
import { gandalfFooVariants, type GandalfFooVariants } from './index'

const props = defineProps<PrimitiveProps & { variant?: GandalfFooVariants['variant']; class?: HTMLAttributes['class'] }>()
const delegatedProps = reactiveOmit(props, 'class', 'variant')
</script>
<template>
  <Foo v-bind="delegatedProps" :class="cn(gandalfFooVariants({ variant }), props.class)"><slot /></Foo>
</template>
```

- Import from `@/components/ui/<name>`, never from `reka-ui`
- Use semantic color classes only: `text-success`, `bg-action-muted`, `border-warning`, etc.

## kit/ component pattern

- Only imports from `@/components/gandalf/base/<name>`, never from `ui/`
- Same two-file structure, no CVA required if there are no variants

## Doc page pattern

```yaml
---
title: GFoo
description: One-line description.
status: planned | in-progress | complete
---
```

- To add to sidebar: edit `navSections` in `app/layouts/docs.vue`
