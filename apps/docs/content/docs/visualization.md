---
title: GVisualizationCard
description: Read-only label and value fields, grouped in a card or in a row of columns.
status: complete
---

# Visualization

Read-only fields that show a label and its value: the result of a form, the summary of a record, the
header of a panel. They follow the **Visualization** page in Figma, which has two fields and two
containers; prop names match the design's properties.

| Figma | Component |
|---|---|
| Visualization Card Field | `GVisualizationCardField` |
| Visualization Layout Field | `GVisualizationLayoutField` |
| Visualization Card Vertical / Horizontal | `GVisualizationCard` |
| Visualization Layout Item | `GVisualizationLayoutCard` |

## Preview

::visualization-preview
::

## Usage

```vue
<template>
  <GVisualizationCard>
    <GVisualizationCardField label="Contrato" value="CT-2026-0184">
      <template #icon><BookCheck /></template>
    </GVisualizationCardField>
    <GVisualizationCardField label="Estado">
      <template #icon><BookCheck /></template>
      <GBadge color="action" size="sm">En revisión</GBadge>
    </GVisualizationCardField>
  </GVisualizationCard>
</template>

<script setup lang="ts">
import { BookCheck } from 'lucide-vue-next'
import { GBadge, GVisualizationCard, GVisualizationCardField } from '@unergy/gandalf'
</script>
```

The card draws the divider on every row but the last one, so the fields inside do not need the
`divider` prop. Use `divider` only for a field that stands on its own.

### Layouts

| `layout` | Figma | Result |
|---|---|---|
| `vertical` (default) | Visualization Card Vertical | One field per row |
| `horizontal` | Visualization Card Horizontal | Two fields per row, 16px apart |

`horizontal` removes the divider from the last two children, so it expects an even number of fields.

### Layout card

`GVisualizationLayoutCard` is the white panel of **Visualization Layout Item**: a `header` slot —
an accordion in the design — and a row of `GVisualizationLayoutField`. Every field but the last one
of each row shows its vertical rule.

```vue
<template>
  <GVisualizationLayoutCard :columns="4">
    <template #header>
      <GAccordionTrigger>Trámite</GAccordionTrigger>
    </template>
    <GVisualizationLayoutField label="Proyecto" value="Solar Palmira">
      <template #icon><BookCheck /></template>
    </GVisualizationLayoutField>
    <GVisualizationLayoutField label="Estado">
      <template #icon><BookCheck /></template>
      <GBadge color="warning">No contesta</GBadge>
    </GVisualizationLayoutField>
  </GVisualizationLayoutCard>
</template>
```

### Values that are not text

The `value` prop renders the design's value text: 14px in `GVisualizationCardField` (cut after three
lines, as the "Comment" field of Figma) and 16px in `GVisualizationLayoutField` (cut after one). For
a badge, an avatar or anything else, leave `value` out and use the default slot.

## GVisualizationCardField Props

::docs-props-table
---
items:
  - name: label
    type: "string"
    default: undefined
    description: Label of the left column. Also available as the `label` slot.
  - name: value
    type: "string | number"
    default: undefined
    description: Value text, cut after three lines.
  - name: placeholder
    type: "string"
    default: undefined
    description: Text shown in base/foreground-extra-quiet when there is no value ("Sin definir" in Figma).
  - name: divider
    type: "boolean"
    default: "false"
    description: Line under the row ("Divider=Yes" in Figma). The card sets it for you.
---
::

## GVisualizationLayoutField Props

::docs-props-table
---
items:
  - name: label
    type: "string"
    default: undefined
    description: Label on top. Also available as the `label` slot.
  - name: value
    type: "string | number"
    default: undefined
    description: Value text, cut after one line.
  - name: divider
    type: "boolean"
    default: "false"
    description: Vertical rule on the right ("Divider=Yes" in Figma). The layout card sets it for you.
---
::

## GVisualizationCard Props

::docs-props-table
---
items:
  - name: layout
    type: "'vertical' | 'horizontal'"
    default: "'vertical'"
    description: One or two fields per row, as the two organisms in Figma.
  - name: title
    type: "string"
    default: undefined
    description: Group title on a 40px row above the fields, as the panels of the Details Panel. Also available as the `title` slot.
---
::

## GVisualizationLayoutCard Props

::docs-props-table
---
items:
  - name: columns
    type: "1 | 2 | 3 | 4"
    default: "4"
    description: Fields per row.
  - name: itemsClass
    type: "string"
    default: undefined
    description: Classes for the grid that holds the fields.
---
::

## Slots

| Component | Slot | Content |
|---|---|---|
| Both fields | `icon` | Lucide icon before the label, 14px. |
| Both fields | `label` | Replaces the `label` text. |
| Both fields | default | Goes in the value area, after `value`: a badge, an avatar, a button. |
| `GVisualizationCard` | default | `GVisualizationCardField` rows. |
| `GVisualizationLayoutCard` | `header` | The card header: an accordion in the design. |
| `GVisualizationLayoutCard` | default | `GVisualizationLayoutField` columns. |
