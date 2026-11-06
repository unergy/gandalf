---
title: GSegmentedButton
description: A pill of joined segments where one option stays selected.
status: in-progress
---

# GSegmentedButton

The **Segmented Button** page in Figma: a pill with an outline, joined segments and a 1px divider between them. One segment is selected at a time; the active one turns purple.

- **`GSegmentedButton`** (Segmented Button): the container.
- **`GSegment`** (Segment): one option, 40px tall, with an optional icon and a label.

Figma's `Type=Two…Six` is just the number of segments, so it is not a prop — render as many `GSegment` as the design needs.

## Preview

::segmented-button-preview
::

## Usage

```vue
<template>
  <GSegmentedButton v-model="range">
    <GSegment value="day">Día</GSegment>
    <GSegment value="week">Semana</GSegment>
    <GSegment value="month">Mes</GSegment>
  </GSegmentedButton>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { GSegment, GSegmentedButton } from '@unergy-dev/gandalf'

const range = ref('week')
</script>
```

Figma draws a label above the pill. That label is `GLabel`, with 4px of separation:

```vue
<div class="flex flex-col gap-1">
  <GLabel required>Filtros rápidos</GLabel>
  <GSegmentedButton v-model="range">…</GSegmentedButton>
</div>
```

With `type="multiple"` the model is an array and more than one segment can stay active.

## Props

### GSegmentedButton

::docs-props-table
---
items:
  - name: modelValue
    type: "string | string[]"
    default: undefined
    description: Selected value (v-model). An array when type is "multiple".
  - name: defaultValue
    type: "string | string[]"
    default: undefined
    description: Initial value when the component is uncontrolled.
  - name: type
    type: "'single' | 'multiple'"
    default: "'single'"
    description: Whether one or several segments can stay active.
  - name: disabled
    type: "boolean"
    default: "false"
    description: Disables every segment.
  - name: orientation
    type: "'horizontal' | 'vertical'"
    default: "'horizontal'"
    description: Direction the arrow keys move focus in.
  - name: rovingFocus
    type: "boolean"
    default: "true"
    description: Arrow-key navigation between segments.
  - name: loop
    type: "boolean"
    default: "true"
    description: Arrow-key navigation wraps from the last segment to the first.
---
::

### GSegment

::docs-props-table
---
items:
  - name: value
    type: "string"
    default: "—"
    description: Value this segment selects.
  - name: disabled
    type: "boolean"
    default: "false"
    description: Disables this segment.
---
::

Both components accept `class`, which is merged last.

## Design

| Figma | Code |
|---|---|
| Container, `corner/5xl` 1000px, border `bni/border-extra-loud` | `rounded-full border border-bni-border-extra-loud bg-card overflow-hidden` |
| Divider 1px `bni/border-extra-loud` | left border of every segment but the first |
| Segment, 40px, padding 12px, gap 8px, `Action/md` | `h-10 px-3 gap-2 text-base font-semibold` |
| `State=Enabled`, text `base/foreground` | `text-base-foreground` on `bg-card` |
| `State=Hovered` / `Pressed`, `alpha/dark-5` / `dark-8` | `hover:overlay-dark-5` / `active:overlay-dark-8` |
| `State=Activeded`, `accent-pr/accent` + `accent-pr/foreground` | `data-[state=on]:bg-accent-primary data-[state=on]:text-accent-primary-foreground` |
| `Icon/md` 16px (lucide) | `[&_svg:not([class*='size-'])]:size-4`, from the shadcn toggle |
