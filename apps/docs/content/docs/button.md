---
title: GButton
description: A button with the Figma types, three sizes and an optional alert dot.
status: in-progress
---

# GButton

A button that wraps shadcn/ui's `Button` with the variants and sizes of the **Button** component in Figma. Icons go in the slot next to the label; an icon alone makes a square button.

## Preview

::button-preview
::

## Usage

```vue
<template>
  <GButton @click="save"><Save /> Save</GButton>
  <GButton variant="outline-primary">Cancel</GButton>
  <GButton variant="ghost-danger" size="sm"><Trash /> Delete</GButton>
  <GButton variant="ghost-primary" size="xs" aria-label="More actions"><EllipsisVertical /></GButton>
</template>

<script setup lang="ts">
import { EllipsisVertical, Save, Trash } from 'lucide-vue-next'
import { GButton } from '@unergy/gandalf'
</script>
```

### Variants

`variant` takes the Type names from Figma. (The Figma property is called Type, but `type` is the native `<button>` attribute, as in `type="submit"`.)

| `variant` | Figma Type | Look |
|---|---|---|
| `tonal-primary` (default) | Tonal primary | Filled with the brand color |
| `tonal-action` | Tonal action | Filled blue |
| `tonal-destructive` | Tonal destructive | Filled red |
| `outline-primary` | Outline primary | White with a border |
| `outline-destructive` | Outline destructive | White with a border, red text |
| `ghost-primary` | Ghost primary | No background |
| `ghost-action` | Ghost action | No background, blue text |
| `ghost-danger` | Ghost danger | No background, red text |

Hover and press darken (or, on filled buttons, lighten) the button with the `alpha` overlays from Figma. Disabled buttons use the muted colors from the design instead of transparency.

### Sizes

| `size` | Height | Text |
|---|---|---|
| `md` (default) | 40px | 16px |
| `sm` | 36px | 14px |
| `xs` | 32px | 14px |

## GButton Props

::docs-props-table
---
items:
  - name: variant
    type: "'tonal-primary' | 'tonal-action' | 'tonal-destructive' | 'outline-primary' | 'outline-destructive' | 'ghost-primary' | 'ghost-action' | 'ghost-danger'"
    default: "'tonal-primary'"
    description: Type from Figma.
  - name: size
    type: "'md' | 'sm' | 'xs'"
    default: "'md'"
    description: Height and text size.
  - name: alertDot
    type: "boolean"
    default: "false"
    description: Red notification dot on the top-right corner ("Alert Dot" in Figma).
  - name: as / asChild
    type: "string | Component / boolean"
    default: "'button' / false"
    description: Render as another element or component, e.g. a router link.
---
::
