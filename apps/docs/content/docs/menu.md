---
title: GMenu
description: A dropdown menu with free content — icons, group titles, separators and destructive items.
status: in-progress
---

# GMenu

Figma's **Dropdown menu** with free content. Where `GDropdown` renders a list of `options`, `GMenu` takes its items as children, so each one can carry an icon, a badge or a red `destructive` style, and the list can be split with separators and group titles. Every piece uses the same `gandalfMenu*Variants` as `GDropdown`, `GSelect` and `GCombobox`.

## Preview

::menu-preview
::

## Usage

```vue
<template>
  <GMenu>
    <GMenuTrigger>
      <GButton variant="ghost-primary" size="sm" aria-label="More options">
        <EllipsisVertical />
      </GButton>
    </GMenuTrigger>
    <GMenuContent align="end">
      <GMenuItem @select="download"><Map />Descargar KMZ</GMenuItem>
      <GMenuItem @select="copyLink"><Copy />Copiar link</GMenuItem>
      <GMenuSeparator />
      <GMenuItem variant="destructive" @select="exit"><LogOut />Salir</GMenuItem>
    </GMenuContent>
  </GMenu>
</template>
```

`GMenuTrigger` is `as-child` by default: its slot is the trigger itself. Use `@select` on an item for its action; the menu closes on its own.

## Pieces

| Component        | Figma                 | Notes                                                   |
| ---------------- | --------------------- | ------------------------------------------------------- |
| `GMenu`          | Dropdown menu         | Root. `v-model:open` to control it.                     |
| `GMenuTrigger`   | —                     | `as-child` by default.                                  |
| `GMenuContent`   | Dropdown menu         | 12px padding, 200px min width. `align`, `side`, etc.    |
| `GMenuItem`      | Menu Item             | `variant`: `default` or `destructive`. Icon goes first. |
| `GMenuLabel`     | Divider, Type=Header  | Group title.                                            |
| `GMenuSeparator` | Divider, Type=Line    | 36px row with the line in the middle.                   |

## Props

### GMenuItem

::docs-props-table
---
items:
  - name: variant
    type: "'default' | 'destructive'"
    default: "'default'"
    description: "`destructive` paints text and icon in `destructive/destructive`, for an exit or a delete."
  - name: disabled
    type: boolean
    default: "false"
    description: The item can't be chosen and shows the muted style.
---
::
