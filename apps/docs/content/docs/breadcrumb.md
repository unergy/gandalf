---
title: GBreadcrumb
description: The path to the current page, with a link to each level above it.
status: complete
---

# GBreadcrumb

The **Breadcrumbs** page in Figma: a row of **Breadcrumbs Item**s, each one a page name followed by
a chevron, ending in the current page in semibold. It wraps shadcn/ui's `Breadcrumb` parts, so you
compose it piece by piece.

## Preview

::breadcrumb-preview
::

## Usage

```vue
<template>
  <GBreadcrumb>
    <GBreadcrumbList>
      <GBreadcrumbItem>
        <GBreadcrumbLink href="/proyectos">Proyectos</GBreadcrumbLink>
      </GBreadcrumbItem>
      <GBreadcrumbSeparator />
      <GBreadcrumbItem>
        <GBreadcrumbPage>Level two</GBreadcrumbPage>
      </GBreadcrumbItem>
    </GBreadcrumbList>
  </GBreadcrumb>
</template>

<script setup lang="ts">
import {
  GBreadcrumb,
  GBreadcrumbList,
  GBreadcrumbItem,
  GBreadcrumbLink,
  GBreadcrumbPage,
  GBreadcrumbSeparator,
} from '@unergy-dev/gandalf'
</script>
```

Use `as` or `asChild` on `GBreadcrumbLink` to render a `NuxtLink`.

## Figma → code

| Figma | Code | Look |
|---|---|---|
| Size=md / xs | `size="md"` (default) / `"xs"` on `GBreadcrumb` | 14px text and icon, 24px tall / 12px text and icon |
| State=Enabled | `GBreadcrumbLink` | `base/foreground-extra-quiet` |
| State=Hovered | `GBreadcrumbLink` on hover | text and chevron `base/foreground` |
| State=Activated | `GBreadcrumbPage` | semibold `base/foreground`, no chevron |
| Chevron (`chevron-right`) | `GBreadcrumbSeparator` | 8px from the text in md, right next to it in xs |

`GBreadcrumbEllipsis` is not in Figma: it collapses levels with the same size as an item.

## Size

```vue
<GBreadcrumb size="xs">
  <!-- ... -->
</GBreadcrumb>
```

## With ellipsis

```vue
<GBreadcrumbItem>
  <GBreadcrumbEllipsis />
</GBreadcrumbItem>
```

## GBreadcrumb Props

::docs-props-table
---
items:
  - name: size
    type: "'md' | 'xs'"
    default: "'md'"
    description: Size of every item (Figma's Size).
---
::

## Components

| Component | Description |
|---|---|
| `GBreadcrumb` | Root `<nav>`; sets the size. |
| `GBreadcrumbList` | Ordered list of items. |
| `GBreadcrumbItem` | One level. |
| `GBreadcrumbLink` | Link to a level above (State=Enabled / Hovered). Accepts `href`, `as` or `asChild`. |
| `GBreadcrumbPage` | The current page (State=Activated). |
| `GBreadcrumbSeparator` | Chevron between items. |
| `GBreadcrumbEllipsis` | Collapsed levels. |
