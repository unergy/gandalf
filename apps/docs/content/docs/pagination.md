---
title: GPagination
description: A pagination component for navigating through pages of content.
status: in-progress
---

# GPagination

A compound pagination component built on top of shadcn/ui's `Pagination` primitives. Supports first/last navigation, previous/next, numbered pages, and ellipsis.

## Preview

::pagination-preview
::

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

## Components

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

`GPagination` extends all props from Reka UI's [`PaginationRoot`](https://reka-ui.com/docs/components/pagination).

::docs-props-table
---
items:
  - name: total
    type: "number"
    default: undefined
    description: Total number of items.
  - name: page
    type: "number"
    default: undefined
    description: Current page (v-model:page).
  - name: defaultPage
    type: "number"
    default: undefined
    description: Default page (uncontrolled).
  - name: itemsPerPage
    type: "number"
    default: "10"
    description: Items per page.
  - name: siblingCount
    type: "number"
    default: undefined
    description: Number of sibling pages around current.
  - name: showEdges
    type: "boolean"
    default: undefined
    description: Whether to always show first and last pages.
---
::

## GPaginationItem Props

::docs-props-table
---
items:
  - name: value
    type: "number"
    default: undefined
    description: The page number this item represents.
  - name: isActive
    type: "boolean"
    default: "false"
    description: Whether this page is currently active.
  - name: size
    type: "ButtonVariants['size']"
    default: "'icon'"
    description: Button size variant.
---
::
