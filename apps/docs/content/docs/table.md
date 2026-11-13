---
title: GTable
description: A data table with sorting, filtering, and pagination support.
status: complete
---

# GTable

A wrapper around shadcn/ui's `Table` primitives. Provides `GTable`, `GTableHeader`, `GTableBody`, `GTableFooter`, `GTableRow`, `GTableHead`, `GTableCell`, and `GTableCaption` for building flexible data tables. Since these render plain HTML table elements, they compose directly with tools like [TanStack Table](https://tanstack.com/table) if you need sorting, filtering, or pagination logic.

Styled after the Figma **Table** page: a 12px-rounded frame with a `bni/border` outline, 44px header cells on `base/base` (12px semibold, `base/foreground-extra-quiet`), 40px body cells (14px, `base/inverse`) with a bottom border, and an `accent` row on hover. The `footer` slot of `GTable` is the Figma footer bar (row count plus pager) under the scrollable area.

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
import { GTable, GTableHeader, GTableBody, GTableRow, GTableHead, GTableCell } from '@unergy-dev/gandalf'
</script>
```

## Two-line cells

Figma's *Text Configuration=Double* is the `description` prop (or slot) of `GTableHead` and `GTableCell`:

```vue
<GTableHead description="Description">Label</GTableHead>
<GTableCell description="Description">Title</GTableCell>
```

## Header action

`GTableHead` has an `action` slot for the ghost button Figma shows on hover (sort, menu). It is hidden until the header cell is hovered or the button has focus.

```vue
<GTableHead>
  Name
  <template #action>
    <GButton variant="ghost-primary" size="xs" aria-label="Sort"><ChevronDown /></GButton>
  </template>
</GTableHead>
```

## Footer

```vue
<GTable>
  …
  <template #footer>
    <p class="flex-1"><span class="text-base-inverse font-semibold">5</span> de <span class="text-base-inverse font-semibold">20</span> row(s) displayed</p>
    <GButton variant="ghost-primary" size="xs">1</GButton>
  </template>
</GTable>
```

Selection uses `GCheckbox` in the first column; set `data-state="selected"` on the row to tint it.

## Components

| Component | Description |
|---|---|
| `GTable` | Root `<table>`, inside the bordered frame and a horizontally scrollable container. Slot `footer` for the footer bar |
| `GTableHeader` | `<thead>` — wraps the header row(s) |
| `GTableBody` | `<tbody>` — wraps the data rows |
| `GTableFooter` | `<tfoot>` — summary rows, on `base/base` |
| `GTableRow` | `<tr>` — a single row, with hover and selected-state styling |
| `GTableHead` | `<th>` — a header cell. Prop `description`, slots `description` and `action` |
| `GTableCell` | `<td>` — a data cell. Prop `description`, slot `description` |
| `GTableCaption` | `<caption>` — a caption below the table |

## Props

Every `GTable*` component takes a `class` prop for style overrides; `GTable` also takes `containerClass` (the frame), and `GTableHead` / `GTableCell` take `description` — there are no Reka UI root props involved (unlike `GTabs`/`GPagination`), since these wrap plain HTML table elements. Native HTML attributes (`colspan`, `rowspan`, `scope`, etc.) pass through automatically.

::docs-props-table
---
items:
  - name: class
    type: "string"
    default: undefined
    description: Additional classes merged onto the underlying element.
  - name: containerClass
    type: "string"
    default: undefined
    description: "GTable only: classes for the bordered frame."
  - name: description
    type: "string"
    default: undefined
    description: "GTableHead / GTableCell: second line (Figma Text Configuration=Double)."
---
::
