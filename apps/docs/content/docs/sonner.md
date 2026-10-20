---
title: GToaster
description: Toast notification system powered by Sonner.
status: in-progress
---

# GToaster

A toast notification system built on top of the `vue-sonner` library. Place `<GToaster />` once in the app root, then fire toasts anywhere via the `gToast` helper — one function per semantic color, matching the same six-color system used by `GBadge` (`default`, `action`, `information`, `success`, `warning`, `destructive`). Each renders a fully custom card with a color-matched icon, title, description, and close button.

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
import { GToaster, gToast } from '@/components/gandalf/base/sonner'
</script>
```

## Components

| Component | Description |
|---|---|
| `GToaster` | The toast host. Mount once, typically in the app root layout |
| `gToast` | Helper object with one function per color: `default`, `action`, `information`, `success`, `warning`, `destructive` |

## gToast

Each function takes `(title: string, description?: string)` and returns the toast id (usable with `toast.dismiss`, re-exported from `vue-sonner`).

```ts
gToast.default('Title', 'Description')
gToast.action('Processing…', 'This may take a moment.')
gToast.information('Heads up', 'New version available.')
gToast.success('Saved', 'Your changes were saved.')
gToast.warning('Careful', 'This action can\'t be undone.')
gToast.destructive('Failed', 'Something went wrong.')
```

## GToaster Props

`GToaster` extends all props from `vue-sonner`'s [`Toaster`](https://vue-sonner.robinnn.dev).

::docs-props-table
---
items:
  - name: position
    type: "'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center'"
    default: "'top-right'"
    description: Where toasts are anchored on screen.
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
