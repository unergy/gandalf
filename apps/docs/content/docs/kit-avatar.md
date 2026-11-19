---
title: Avatar
description: Avatar with flat props, and Avatar Group from Figma.
status: complete
---

# Avatar

`GKitAvatar` is `GAvatar` with flat props (`src`, `alt`, `fallback`). `GKitAvatarGroup` is the **Avatar Group** from Figma.

## Preview

::kit-avatar-preview
::

## Usage

```vue
<script setup lang="ts">
import { GKitAvatar, GKitAvatarGroup } from '@unergy-dev/gandalf'
</script>

<template>
  <GKitAvatar fallback="AV" size="md" semantic="action" />

  <GKitAvatarGroup :more="3">
    <GKitAvatar fallback="AV" semantic="action" />
    <GKitAvatar fallback="AV" semantic="information" />
    <GKitAvatar fallback="AV" semantic="warning" />
  </GKitAvatarGroup>
</template>
```

## Avatar Group

Each avatar overlaps the previous one by half its size (16px at 32px), as in Figma. `type` and `size` apply to every avatar inside. `more` adds a last `default` avatar with "+N" (Type=+3 in Figma).

## Custom colors

`bg` and `color` take hex values for cases outside the Figma semantics; they are inline styles on the fallback.

```vue
<GKitAvatar fallback="XY" bg="#1e293b" color="#f8fafc" />
```

## Props

### GKitAvatar

::docs-props-table
---
items:
  - name: src
    type: string
    default: "undefined"
    description: Image source URL. Without it, the fallback is shown.
  - name: alt
    type: string
    default: "''"
    description: Alt text for the image.
  - name: fallback
    type: string
    default: "undefined"
    description: Text shown when there is no image (e.g. initials).
  - name: type
    type: "'circle' | 'square'"
    default: "'circle'"
    description: Shape.
  - name: size
    type: "'xs' | 'sm' | 'md' | 'lg'"
    default: "'sm'"
    description: 24 / 32 / 40 / 48px.
  - name: semantic
    type: "'default' | 'action' | 'information' | 'success' | 'warning' | 'destructive'"
    default: "'default'"
    description: Color of the fallback.
  - name: bg
    type: "`#${string}`"
    default: "undefined"
    description: Custom hex background for the fallback.
  - name: color
    type: "`#${string}`"
    default: "undefined"
    description: Custom hex text color for the fallback.
  - name: delayMs
    type: number
    default: "undefined"
    description: Delay in ms before showing the fallback.
  - name: class
    type: "HTMLAttributes['class']"
    default: "undefined"
    description: Additional CSS classes on the root.
---
::

### GKitAvatarGroup

::docs-props-table
---
items:
  - name: type
    type: "'circle' | 'square'"
    default: "'circle'"
    description: Shape of every avatar inside, unless one sets its own.
  - name: size
    type: "'xs' | 'sm' | 'md' | 'lg'"
    default: "'sm'"
    description: Size of every avatar inside, and the overlap (half of it).
  - name: more
    type: number
    default: "undefined"
    description: Adds a last "+N" avatar for hidden ones.
  - name: class
    type: "HTMLAttributes['class']"
    default: "undefined"
    description: Additional CSS classes.
---
::
