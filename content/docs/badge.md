---
title: GBadge
description: A versatile badge component with multiple variants, colors, shapes, and sizes.
---

# GBadge

A versatile badge component built on top of `Badge` from shadcn/ui, with support for semantic colors, shape toggles, and icon-only sizing.

## Preview

::badge-preview
::

## Usage

```vue
<template>
  <GBadge variant="default" color="success">Active</GBadge>
  <GBadge variant="outline" color="warning">Pending</GBadge>
</template>

<script setup lang="ts">
import { GBadge } from '@/components/gandalf/badge'
</script>
```

## Variants

### Default (filled)

```vue
<GBadge color="success">Success</GBadge>
<GBadge color="warning">Warning</GBadge>
<GBadge color="destructive">Destructive</GBadge>
```

### Outline

```vue
<GBadge variant="outline" color="action">Action</GBadge>
<GBadge variant="outline" color="information">Information</GBadge>
```

### Shapes

```vue
<GBadge shape="rounded">Rounded</GBadge>
<GBadge shape="square">Square</GBadge>
```

### Icon size

```vue
<GBadge size="icon">
  <Sun />
</GBadge>
```

## Props

## ::docs-props-table

items:

- name: variant
  type: "'default' | 'outline'"
  default: "'default'"
  description: Visual style of the badge — filled or outlined.
- name: color
  type: "'default' | 'action' | 'information' | 'success' | 'warning' | 'destructive'"
  default: "'default'"
  description: Semantic color theme applied to the badge.
- name: shape
  type: "'rounded' | 'square'"
  default: "'rounded'"
  description: Border radius shape of the badge.
- name: size
  type: "'sm' | 'default' | 'lg' | 'icon'"
  default: "'default'"
  description: Size variant. Use 'icon' for icon-only badges (square, no padding).
- name: disabled
  type: boolean
  default: "false"
  description: When true, applies reduced opacity and disables cursor interactions.

---

::
