---
title: Avatar
description: A unified avatar component with built-in image, text fallback, shape variants, and hex color support.
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

## Colors

Use `color` to set a hex background color on the fallback, and `textColor` to set the text color. Both props accept only hex values (`#rrggbb` or `#rrggbbaa`), enforced by the type system.

### Background color

```vue
<Avatar fallback="AB" bg="#6366f1" />
<Avatar fallback="MK" bg="#f59e0b" />
<Avatar fallback="TR" bg="#10b981" />
```

### Background + text color

```vue
<Avatar fallback="XY" bg="#1e293b" color="#f8fafc" />
<Avatar fallback="RZ" bg="#fef3c7" color="#92400e" />
```

These props apply inline styles directly on the fallback element, so they take precedence over the default `bg-muted` class.

## Custom size

The default size is `size-8` (32 px), inherited from the underlying shadcn/ui `Avatar`. Override it with a Tailwind size class:

```vue
<Avatar fallback="LG" bg="#6366f1" color="#ffffff" class="size-12 text-base" />
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
  - name: bg
    type: "`#${string}`"
    default: "undefined"
    description: Hex background color applied to the fallback element (e.g. '#6366f1'). Overrides the default bg-muted.
  - name: color
    type: "`#${string}`"
    default: "undefined"
    description: Hex text color applied to the fallback element (e.g. '#ffffff').
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
