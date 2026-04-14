---
title: GAvatar
description: An image element with a fallback for representing the user.
---

# GAvatar

An avatar component built on top of shadcn/ui's `Avatar` primitives. Displays a user image with automatic fallback support.

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

## Sub-components

| Component | Description |
|---|---|
| `GAvatar` | Root container (rounded, 32px default) |
| `GAvatarImage` | The `<img>` element rendered inside the avatar |
| `GAvatarFallback` | Fallback content shown while image loads or on error |

## GAvatarImage Props

Extends all props from Reka UI's [`AvatarImage`](https://reka-ui.com/docs/components/avatar).

| Prop | Type | Description |
|---|---|---|
| `src` | `string` | Image source URL |
| `alt` | `string` | Alt text for the image |

## GAvatarFallback Props

| Prop | Type | Description |
|---|---|---|
| `delayMs` | `number` | Delay in ms before showing fallback (avoids flicker) |
| `class` | `HTMLAttributes['class']` | Additional CSS classes |
