---
title: Avatar
description: A unified avatar component with built-in image, text fallback, size and shape variants.
---

## Preview

::kit-avatar-preview
::

## Usage

```vue
<script setup lang="ts">
import Avatar from '@/components/gandalf/kit/avatar/Avatar.vue'
</script>

<template>
  <Avatar src="https://github.com/shadcn.png" alt="@shadcn" fallback="CN" />
</template>
```

## Source

Lives in `gandalf/kit/` — composed from `GAvatar`, `GAvatarImage` and `GAvatarFallback` from `gandalf/base/avatar`.

## Sizes

```vue
<Avatar src="..." fallback="CN" size="sm" />
<Avatar src="..." fallback="CN" size="default" />
<Avatar src="..." fallback="CN" size="md" />
<Avatar src="..." fallback="CN" size="lg" />
```

## Variants

```vue
<!-- Rounded (default) -->
<Avatar src="..." fallback="CN" variant="rounded" />

<!-- Square -->
<Avatar src="..." fallback="CN" variant="square" />
```

## Fallback only

When `src` is omitted or the image fails to load, the `fallback` text is displayed automatically:

```vue
<Avatar fallback="JD" />
```

## Props

::docs-props-table
---
items:
  - name: src
    type: string
    default: "undefined"
    description: Image source URL. When omitted, the fallback is shown directly.
  - name: alt
    type: string
    default: "''"
    description: Alt text for the image.
  - name: fallback
    type: string
    default: "undefined"
    description: Text displayed when the image is unavailable or still loading (e.g. initials).
  - name: size
    type: "'sm' | 'default' | 'md' | 'lg'"
    default: "'default'"
    description: "Controls the avatar dimensions: sm=24px, default=32px, md=40px, lg=48px."
  - name: variant
    type: "'rounded' | 'square'"
    default: "'rounded'"
    description: Shape of the avatar — fully rounded circle or rounded square.
  - name: delayMs
    type: number
    default: "undefined"
    description: Delay in ms before showing the fallback, to avoid flicker on fast loads.
  - name: class
    type: "HTMLAttributes['class']"
    default: "undefined"
    description: Additional CSS classes applied to the root element.
---
::
