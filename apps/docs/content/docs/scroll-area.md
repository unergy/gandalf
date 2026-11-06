---
title: GScrollArea
description: A scrollable container with Gandalf's own scrollbar.
status: complete
---

# GScrollArea

A scrollable container that replaces the native scrollbar with the one drawn in Figma's **Scroll Bar** page: a 6px `base/base-loud` track with a `base/foreground-quiet` thumb, both with a `corner/sm` radius, 8px away from the container edge and 8px inset inside the track.

It wraps shadcn/ui's `ScrollArea`, which is built on Reka UI's `ScrollArea` primitive, so the same scrollbar shows up in every browser.

## Preview

::scroll-area-preview
::

## Usage

```vue
<template>
  <GScrollArea class="h-56 w-56 rounded-lg border">
    <div class="flex flex-col gap-2 p-4">
      <span v-for="tag in tags" :key="tag">{{ tag }}</span>
    </div>
  </GScrollArea>
</template>

<script setup lang="ts">
import { GScrollArea } from '@unergy/gandalf'

const tags = Array.from({ length: 24 }, (_, i) => `v1.2.0-beta.${24 - i}`)
</script>
```

### Horizontal

`orientation` maps Figma's **Type** property. Use `horizontal` for a single horizontal bar, or `both` to keep the vertical one too. The content has to be wider than the container (`w-max`, `whitespace-nowrap`…).

```vue
<template>
  <GScrollArea orientation="horizontal" class="w-80 rounded-lg border">
    <div class="flex w-max gap-3 p-4">
      <span v-for="month in months" :key="month" class="whitespace-nowrap">{{ month }}</span>
    </div>
  </GScrollArea>
</template>
```

### Always visible

By default the scrollbar only shows up when the content overflows (`type="auto"`). Pass `type="always"` to keep the track visible, or `type="hover"` / `type="scroll"` for the Reka behaviours.

```vue
<GScrollArea type="always" class="h-56 w-56" />
```

## GScrollArea Props

::docs-props-table
---
items:
  - name: orientation
    type: "'vertical' | 'horizontal' | 'both'"
    default: "'vertical'"
    description: Which scrollbars are shown. Maps Figma's Type property.
  - name: type
    type: "'auto' | 'always' | 'scroll' | 'hover'"
    default: "'auto'"
    description: When the scrollbar is visible. Forwarded to Reka UI.
  - name: scrollHideDelay
    type: "number"
    default: "600"
    description: Milliseconds before the scrollbar hides with type `scroll` or `hover`.
  - name: dir
    type: "'ltr' | 'rtl'"
    default: "—"
    description: Reading direction of the content.
  - name: class
    type: "string"
    default: "—"
    description: Extra classes for the container. Set its height and width here.
---
::

### Slots

| Slot      | Description                     |
| --------- | ------------------------------- |
| `default` | The content that scrolls. |

## GScrollBar

`GScrollArea` already renders its own bars; `GScrollBar` is only exported for custom compositions over Reka's `ScrollAreaRoot`.

::docs-props-table
---
items:
  - name: orientation
    type: "'vertical' | 'horizontal'"
    default: "'vertical'"
    description: Direction of the bar. Maps Figma's Type property.
  - name: class
    type: "string"
    default: "—"
    description: Extra classes for the bar.
---
::
