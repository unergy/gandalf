---
title: GBadge
description: A versatile badge component with multiple variants, colors, shapes, and sizes.
status: complete
---

# GBadge

A badge built on top of `Badge` from shadcn/ui, styled as the **Badge** component in Figma: Tonal or Outlined, six semantic colors (or any hex color), rounded or square, three sizes. An icon alone makes a square badge.

## Preview

::badge-preview
::

## Usage

```vue
<template>
  <GBadge variant="tonal" color="success">Active</GBadge>
  <GBadge variant="outlined" color="warning">Pending</GBadge>
</template>

<script setup lang="ts">
import { GBadge } from '@unergy/gandalf'
</script>
```

## Variants

### Tonal (default)

```vue
<GBadge color="success">Success</GBadge>
<GBadge color="warning">Warning</GBadge>
<GBadge color="destructive">Destructive</GBadge>
```

### Outlined

```vue
<GBadge variant="outlined" color="action">Action</GBadge>
<GBadge variant="outlined" color="information">Information</GBadge>
```

### Shapes

```vue
<GBadge shape="rounded">Rounded</GBadge>
<GBadge shape="square">Square</GBadge>
```

### Sizes

```vue
<GBadge>md · 28px</GBadge>
<GBadge size="sm">sm · 24px</GBadge>
<GBadge size="xs">xs · 22px</GBadge>
```

### Icon only

An icon with no text keeps the badge square:

```vue
<GBadge><Sun /></GBadge>
```

### Links and buttons

Rendered as a link or a button (`as="a"`, `as="button"`), the badge darkens on hover and press with the Figma overlays. A plain badge does not react to the pointer.

### Custom color

Besides the semantic color names, `color` also accepts any hex color (`#RGB`, `#RGBA`, `#RRGGBB`, or `#RRGGBBAA`). The badge only takes the hue from the value you pass — saturation and lightness are normalized so every custom color has the same visual weight (tinted background, bold text/border) as the built-in semantic colors, no matter how light, dark, or pastel the input is.

```vue
<GBadge color="#C6EAFB">Custom</GBadge>
<GBadge variant="outlined" color="#F18D91">Custom outline</GBadge>
```

## Props

::docs-props-table
---
items:
  - name: variant
    type: "'tonal' | 'outlined'"
    default: "'tonal'"
    description: Type in Figma — filled, or filled with an outline.
  - name: color
    type: "'default' | 'action' | 'information' | 'success' | 'warning' | 'destructive' | string"
    default: "'default'"
    description: Semantic color theme applied to the badge, or a custom hex color (e.g. "#7c3aed").
  - name: shape
    type: "'rounded' | 'square'"
    default: "'rounded'"
    description: Border radius shape of the badge.
  - name: size
    type: "'md' | 'sm' | 'xs'"
    default: "'md'"
    description: Height and text size — md 28px / 16px, sm 24px / 14px, xs 22px / 14px.
  - name: disabled
    type: boolean
    default: "false"
    description: Muted fill and quiet text, as Figma's disabled state.
---
::
