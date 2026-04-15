---
title: GBreadcrumb
description: A navigation breadcrumb with composable sub-components.
---

# GBreadcrumb

A breadcrumb component that wraps shadcn/ui's `Breadcrumb` primitives. Fully composable — use the sub-components to build any breadcrumb layout.

## Usage

```vue
<template>
  <GBreadcrumb>
    <GBreadcrumbList>
      <GBreadcrumbItem>
        <GBreadcrumbLink href="/">Home</GBreadcrumbLink>
      </GBreadcrumbItem>
      <GBreadcrumbSeparator />
      <GBreadcrumbItem>
        <GBreadcrumbLink href="/docs">Docs</GBreadcrumbLink>
      </GBreadcrumbItem>
      <GBreadcrumbSeparator />
      <GBreadcrumbItem>
        <GBreadcrumbPage>Current Page</GBreadcrumbPage>
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
} from '@/components/gandalf/breadcrumb'
</script>
```

## With Ellipsis

Use `GBreadcrumbEllipsis` to collapse intermediate items when the breadcrumb is too long.

```vue
<template>
  <GBreadcrumb>
    <GBreadcrumbList>
      <GBreadcrumbItem>
        <GBreadcrumbLink href="/">Home</GBreadcrumbLink>
      </GBreadcrumbItem>
      <GBreadcrumbSeparator />
      <GBreadcrumbItem>
        <GBreadcrumbEllipsis />
      </GBreadcrumbItem>
      <GBreadcrumbSeparator />
      <GBreadcrumbItem>
        <GBreadcrumbPage>Current</GBreadcrumbPage>
      </GBreadcrumbItem>
    </GBreadcrumbList>
  </GBreadcrumb>
</template>
```

## Components

| Component | Description |
|---|---|
| `GBreadcrumb` | Root container. |
| `GBreadcrumbList` | Ordered list wrapping the items. |
| `GBreadcrumbItem` | Individual breadcrumb entry. |
| `GBreadcrumbLink` | Clickable link inside an item. Accepts `href` or `as` for custom routing. |
| `GBreadcrumbPage` | Non-interactive label for the current page. |
| `GBreadcrumbSeparator` | Visual separator between items. Defaults to `/`. |
| `GBreadcrumbEllipsis` | Collapsed indicator for hidden items. |
