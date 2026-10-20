---
title: GAvatar
description: An image element with a fallback for representing users, with shape variant support.
status: complete
---

# GAvatar

An avatar component built on top of `Avatar` from shadcn/ui. Displays a user image with automatic fallback support and a `variant` prop to control the shape. The shape is propagated to `GAvatarFallback` automatically via `provide`/`inject`.

## Preview

::avatar-preview
::

## Usage

```vue
<template>
  <GAvatar>
    <GAvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
    <GAvatarFallback>CN</GAvatarFallback>
  </GAvatar>
</template>

<script setup lang="ts">
import { GAvatar, GAvatarImage, GAvatarFallback } from '@/components/gandalf/base/avatar'
</script>
```

## Variants

### Rounded (default)

```vue
<GAvatar>
  <GAvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
  <GAvatarFallback>CN</GAvatarFallback>
</GAvatar>
```

### Square

```vue
<GAvatar variant="square">
  <GAvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
  <GAvatarFallback>CN</GAvatarFallback>
</GAvatar>
```

### Fallback only

When no image is provided or the image fails to load, the fallback is shown automatically:

```vue
<GAvatar>
  <GAvatarFallback>JD</GAvatarFallback>
</GAvatar>
```

### Custom size

Override the default `size-8` via `class`:

```vue
<GAvatar class="size-12">
  <GAvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
  <GAvatarFallback>CN</GAvatarFallback>
</GAvatar>
```

## Props

### GAvatar

::docs-props-table
---
items:
  - name: variant
    type: "'rounded' | 'square'"
    default: "'rounded'"
    description: Shape of the avatar. Propagated automatically to GAvatarFallback via provide/inject.
  - name: class
    type: "HTMLAttributes['class']"
    default: undefined
    description: Additional CSS classes. Use to override the default size (e.g. class="size-12").
---
::

### GAvatarImage

Extends all props from Reka UI's [`AvatarImage`](https://reka-ui.com/docs/components/avatar).

::docs-props-table
---
items:
  - name: src
    type: "string"
    default: undefined
    description: Image source URL.
  - name: alt
    type: "string"
    default: undefined
    description: Alt text for the image.
---
::

### GAvatarFallback

::docs-props-table
---
items:
  - name: delayMs
    type: "number"
    default: undefined
    description: Delay in milliseconds before the fallback is shown. Useful to avoid flicker when the image loads quickly.
  - name: class
    type: "HTMLAttributes['class']"
    default: undefined
    description: Additional CSS classes.
---
::
