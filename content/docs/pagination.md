---
title: GPagination
description: A pagination component for navigating through pages of content.
---

# GPagination

A compound pagination component built on top of shadcn/ui's `Pagination` primitives. Supports first/last navigation, previous/next, numbered pages, and ellipsis.

## Usage

```vue
<template>
  <GPagination v-slot="{ page }" :total="100" :sibling-count="1" show-edges :default-page="1">
    <GPaginationContent>
      <GPaginationFirst />
      <GPaginationPrevious />

      <template v-for="(item, index) in page.items" :key="index">
        <GPaginationItem v-if="item.type === 'page'" :value="item.value" :is-active="item.value === page.currentPage">
          {{ item.value }}
        </GPaginationItem>
        <GPaginationEllipsis v-else />
      </template>

      <GPaginationNext />
      <GPaginationLast />
    </GPaginationContent>
  </GPagination>
</template>

<script setup lang="ts">
import {
  GPagination,
  GPaginationContent,
  GPaginationItem,
  GPaginationEllipsis,
  GPaginationFirst,
  GPaginationLast,
  GPaginationNext,
  GPaginationPrevious,
} from '@/components/gandalf/pagination'
</script>
```

## Controlled usage

```vue
<template>
  <GPagination v-model:page="currentPage" :total="100" :items-per-page="10">
    <GPaginationContent>
      <GPaginationPrevious />
      <!-- page items -->
      <GPaginationNext />
    </GPaginationContent>
  </GPagination>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const currentPage = ref(1)
</script>
```

## Sub-components

| Component | Description |
|---|---|
| `GPagination` | Root component. Manages page state (`v-model:page`) |
| `GPaginationContent` | Container for pagination items (flex row) |
| `GPaginationItem` | Individual page number button |
| `GPaginationEllipsis` | Ellipsis indicator for skipped pages |
| `GPaginationFirst` | Jump to first page button |
| `GPaginationLast` | Jump to last page button |
| `GPaginationNext` | Go to next page button |
| `GPaginationPrevious` | Go to previous page button |

## GPagination Props

Extends all props from Reka UI's [`PaginationRoot`](https://reka-ui.com/docs/components/pagination).

| Prop | Type | Description |
|---|---|---|
| `total` | `number` | Total number of items |
| `page` | `number` | Current page (`v-model:page`) |
| `defaultPage` | `number` | Default page (uncontrolled) |
| `itemsPerPage` | `number` | Items per page (default: `10`) |
| `siblingCount` | `number` | Number of sibling pages around current |
| `showEdges` | `boolean` | Whether to always show first and last pages |

## GPaginationItem Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `number` | — | The page number this item represents |
| `isActive` | `boolean` | `false` | Whether this page is currently active |
| `size` | `ButtonVariants['size']` | `'icon'` | Button size variant |
