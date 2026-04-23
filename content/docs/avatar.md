---
title: GAvatar
description: An image element with a fallback for representing the user.
status: in-progress
---

# GAvatar

An avatar component built on top of shadcn/ui's `Avatar` primitives. Displays a user image with automatic fallback support.

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
import { GAvatar, GAvatarImage, GAvatarFallback } from '@/components/gandalf/avatar'
</script>
```

## Custom size

```vue
<GAvatar class="size-16">
  <GAvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
  <GAvatarFallback>CN</GAvatarFallback>
</GAvatar>
```

## Fallback only

When no image is provided or the image fails to load, the fallback is displayed:

```vue
<GAvatar>
  <GAvatarFallback>JD</GAvatarFallback>
</GAvatar>
```

## Components

| Component | Description |
|---|---|
| `GAvatar` | Root container (rounded, 32px default) |
| `GAvatarImage` | The `<img>` element rendered inside the avatar |
| `GAvatarFallback` | Fallback content shown while image loads or on error |

## GAvatarImage Props

`GAvatarImage` extends all props from Reka UI's [`AvatarImage`](https://reka-ui.com/docs/components/avatar).

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

## GAvatarFallback Props

::docs-props-table
---
items:
  - name: delayMs
    type: "number"
    default: undefined
    description: Delay in ms before showing fallback (avoids flicker).
  - name: class
    type: "HTMLAttributes['class']"
    default: undefined
    description: Additional CSS classes.
---
::
