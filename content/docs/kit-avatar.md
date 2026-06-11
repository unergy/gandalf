---
title: Avatar
description: A unified avatar component with built-in image, text fallback, and shape variants.
status: complete
---

# Avatar

A composed avatar component built from `GAvatar`, `GAvatarImage`, and `GAvatarFallback` from `gandalf/base/avatar`. Accepts `src`, `alt`, and `fallback` as flat props so you don't need to wire the sub-components manually.

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

## Variants

### Rounded (default)

```vue
<Avatar src="https://github.com/shadcn.png" alt="@shadcn" fallback="CN" />
```

### Square

```vue
<Avatar src="https://github.com/shadcn.png" alt="@shadcn" fallback="CN" variant="square" />
```

### Fallback only

When `src` is omitted or the image fails to load, the `fallback` text is shown automatically:

```vue
<Avatar fallback="JD" />
<Avatar fallback="AB" variant="square" />
```

### Custom size

The default size is `size-8` (32 px), inherited from the underlying shadcn/ui `Avatar`. Override it with a Tailwind size class:

```vue
<Avatar src="..." fallback="CN" class="size-6" />
<Avatar src="..." fallback="CN" class="size-10" />
<Avatar src="..." fallback="CN" class="size-12" />
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
    description: Additional CSS classes applied to the root element. Use to override the default size (e.g. class="size-12").
---
::
