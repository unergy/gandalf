---
title: GAvatar
description: Avatar Item from Figma, with shape, size and semantic color.
status: complete
---

# GAvatar

The **Avatar Item** from the Figma Avatar page. Shows an image or, when there is none, the fallback (initials) in a semantic color. `type` and `semantic` reach `GAvatarFallback` automatically.

## Preview

::avatar-preview
::

## Usage

```vue
<script setup lang="ts">
import { GAvatar, GAvatarImage, GAvatarFallback } from '@unergy-dev/gandalf'
</script>

<template>
  <GAvatar size="md" semantic="action">
    <GAvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
    <GAvatarFallback>AV</GAvatarFallback>
  </GAvatar>
</template>
```

## Figma → code

| Figma                                                                 | Code                                                                                   |
| --------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Type=Circle / Square                                                  | `type="circle"` (default) / `"square"` (8px radius)                                    |
| Size=xs / sm / md / lg                                                | `size="xs"` (24px, 12px) / `"sm"` (32px, 14px, default) / `"md"` (40px, 16px) / `"lg"` (48px, 18px) |
| Semantic=Default / Action / Information / Success / Warning / Destructive | `semantic="default"` … `"destructive"`: `{color}/object` background, `{color}/objectFg` bold text |

## Props

### GAvatar

::docs-props-table
---
items:
  - name: type
    type: "'circle' | 'square'"
    default: "'circle'"
    description: Shape. Inside a GKitAvatarGroup, the group's.
  - name: size
    type: "'xs' | 'sm' | 'md' | 'lg'"
    default: "'sm'"
    description: 24 / 32 / 40 / 48px. Inside a GKitAvatarGroup, the group's.
  - name: semantic
    type: "'default' | 'action' | 'information' | 'success' | 'warning' | 'destructive'"
    default: "'default'"
    description: Color of the fallback.
  - name: class
    type: "HTMLAttributes['class']"
    default: undefined
    description: Additional CSS classes.
---
::

### GAvatarImage

::docs-props-table
---
items:
  - name: src
    type: "string"
    default: undefined
    description: Image source URL. Other attributes (alt…) go to the img.
  - name: referrerPolicy
    type: "string"
    default: undefined
    description: Referrer policy of the img.
  - name: crossOrigin
    type: "string"
    default: undefined
    description: CORS setting of the img.
---
::

### GAvatarFallback

::docs-props-table
---
items:
  - name: delayMs
    type: "number"
    default: undefined
    description: Delay in milliseconds before the fallback is shown, to avoid a flash while the image loads.
  - name: class
    type: "HTMLAttributes['class']"
    default: undefined
    description: Additional CSS classes.
---
::
