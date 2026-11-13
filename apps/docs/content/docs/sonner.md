---
title: GToaster
description: Toast notification system powered by Sonner.
status: in-progress
---

# GToaster

A toast notification system built on top of the `vue-sonner` library. Place `<GToaster />` once in the app root, then fire toasts anywhere via the `gToast` helper — one function per Figma Type (`default`, `action`, `information`, `success`, `warning`, `destructive`). Each one renders `GToast`: a 404px card on `base/base` with a 16px radius, a border, icon and title in the Type's color, a description in `base/foreground-quiet`, and a close button.

| Type | Icon (lucide) |
|---|---|
| `default` | `check` |
| `action` | `loader-circle` (spinning) |
| `information` | `component` |
| `success` | `check` |
| `warning` | `triangle-alert` |
| `destructive` | `siren` |

## Preview

::sonner-preview
::

## Usage

```vue
<template>
  <GToaster />
  <button @click="gToast.success('Saved', 'Your changes were saved.')">
    Save
  </button>
</template>

<script setup lang="ts">
import { GToaster, gToast } from '@unergy-dev/gandalf'
</script>
```

## Components

| Component | Description |
|---|---|
| `GToaster` | The toast host. Mount once, typically in the app root layout |
| `gToast` | Helper object with one function per Type: `default`, `action`, `information`, `success`, `warning`, `destructive` |
| `GToast` | The toast card itself, if you need to render it outside sonner |

## gToast

Each function takes `(title: string, description?: string, options?: ExternalToast)` and returns the toast id (usable with `toast.dismiss`, re-exported from `vue-sonner`).

```ts
gToast.default('Title', 'Description')
gToast.action('Processing…', 'This may take a moment.')
gToast.information('Heads up', 'New version available.')
gToast.success('Saved', 'Your changes were saved.')
gToast.warning('Careful', 'This action can\'t be undone.')
gToast.destructive('Failed', 'Something went wrong.')
```

## GToast Props

::docs-props-table
---
items:
  - name: type
    type: "'default' | 'action' | 'information' | 'success' | 'warning' | 'destructive'"
    default: "'default'"
    description: Figma Type. Sets the border, icon and title color, and the icon.
  - name: title
    type: "string"
    description: One line, truncated with an ellipsis.
  - name: description
    type: "string"
    description: Optional second line, wraps.
  - name: id
    type: "string | number"
    description: Sonner toast id. When set, the close button dismisses that toast. It also emits `close`.
---
::

## GToaster Props

`GToaster` extends all props from `vue-sonner`'s [`Toaster`](https://vue-sonner.robinnn.dev).

::docs-props-table
---
items:
  - name: position
    type: "'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center'"
    default: "'top-right'"
    description: Where toasts are anchored on screen.
  - name: style
    type: "CSSProperties"
    default: "{ '--width': '404px' }"
    description: Sonner's `--width` is set to Figma's 404px; override it here.
  - name: expand
    type: "boolean"
    default: "false"
    description: Whether to always expand stacked toasts instead of collapsing them.
  - name: duration
    type: "number"
    default: "4000"
    description: Default time in ms before a toast auto-dismisses.
  - name: gap
    type: "number"
    default: "14"
    description: Gap in pixels between stacked toasts.
---
::
