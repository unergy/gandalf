---
title: GSkeleton
description: A placeholder loading animation to indicate content is being loaded.
---

# GSkeleton

A skeleton component built on top of `Skeleton` from shadcn/ui. Use it to show a placeholder while content is loading.

## Preview

::skeleton-preview
::

## Usage

```vue
<template>
  <div class="flex items-center space-x-4">
    <GSkeleton class="size-12 rounded-full" />
    <div class="space-y-2">
      <GSkeleton class="h-4 w-[250px]" />
      <GSkeleton class="h-4 w-[200px]" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { GSkeleton } from '@/components/gandalf/skeleton'
</script>
```

## Card skeleton example

```vue
<template>
  <div class="flex flex-col space-y-3">
    <GSkeleton class="h-[125px] w-[250px] rounded-xl" />
    <div class="space-y-2">
      <GSkeleton class="h-4 w-[250px]" />
      <GSkeleton class="h-4 w-[200px]" />
    </div>
  </div>
</template>
```

## GSkeleton Props

::docs-props-table
---
items:
  - name: class
    type: "HTMLAttributes['class']"
    default: undefined
    description: Additional CSS classes to control size and shape.
---
::
