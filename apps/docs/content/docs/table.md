---
title: GTable
description: A data table with sorting, filtering, and pagination support.
status: in-progress
---

# GTable

A wrapper around shadcn/ui's `Table` primitives. Provides `GTable`, `GTableHeader`, `GTableBody`, `GTableFooter`, `GTableRow`, `GTableHead`, `GTableCell`, and `GTableCaption` for building flexible data tables. Since these render plain HTML table elements, they compose directly with tools like [TanStack Table](https://tanstack.com/table) if you need sorting, filtering, or pagination logic.

This first iteration only wraps the shadcn primitives — no visual variants (striping, density, borders) yet. Those will land once a design reference is available.

## Preview

::table-preview
::

## Usage

```vue
<template>
  <GTable>
    <GTableHeader>
      <GTableRow>
        <GTableHead>Invoice</GTableHead>
        <GTableHead>Status</GTableHead>
      </GTableRow>
    </GTableHeader>
    <GTableBody>
      <GTableRow>
        <GTableCell>INV001</GTableCell>
        <GTableCell>Paid</GTableCell>
      </GTableRow>
    </GTableBody>
  </GTable>
</template>

<script setup lang="ts">
import { GTable, GTableHeader, GTableBody, GTableRow, GTableHead, GTableCell } from '@/components/gandalf/base/table'
</script>
```

## Components

| Component | Description |
|---|---|
| `GTable` | Root `<table>` element, wrapped in a horizontally scrollable container |
| `GTableHeader` | `<thead>` — wraps the header row(s) |
| `GTableBody` | `<tbody>` — wraps the data rows |
| `GTableFooter` | `<tfoot>` — wraps a summary/footer row |
| `GTableRow` | `<tr>` — a single row, with hover and selected-state styling |
| `GTableHead` | `<th>` — a header cell |
| `GTableCell` | `<td>` — a data cell |
| `GTableCaption` | `<caption>` — a caption below the table |

## Props

Every `GTable*` component only takes a `class` prop for style overrides — there are no Reka UI root props involved (unlike `GTabs`/`GPagination`), since these wrap plain HTML table elements. Native HTML attributes (`colspan`, `rowspan`, `scope`, etc.) pass through automatically.

::docs-props-table
---
items:
  - name: class
    type: "string"
    default: undefined
    description: Additional classes merged onto the underlying element.
---
::
