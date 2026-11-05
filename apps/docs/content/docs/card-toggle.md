---
title: GCardToggle
description: A selectable card for lists, with an icon, a title, an optional description and complementary info.
status: in-progress
---

# GCardToggle

A selectable card for lists: categories in a sidebar, options inside a dialog. Click toggles its activated state. It follows the **Card → Card Toggle** component in Figma; prop names match the design's properties.

## Preview

::card-toggle-preview
::

## Usage

```vue
<template>
  <GCardToggle v-model="active" title="Item 1" description="Description for a toggle card">
    <template #avatar><FileCheck /></template>
    <template #complementary><Image /> 12</template>
  </GCardToggle>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FileCheck, Image } from 'lucide-vue-next'
import { GCardToggle } from '@unergy/gandalf'

const active = ref(false)
</script>
```

### Single selection in a list

`GCardToggle` holds one boolean. For a list where only one card is active, keep the selected id in the parent:

```vue
<GCardToggle
  v-for="item in items"
  :key="item.id"
  :title="item.title"
  :model-value="selected === item.id"
  @update:model-value="selected = $event ? item.id : null"
/>
```

### Types

| `type` | Figma | Height | Shows |
|---|---|---|---|
| `doble` (default) | Type=Doble | 56px | 40px avatar, title and description |
| `report` | Type=Report | 40px | 24px avatar and title |

## GCardToggle Props

::docs-props-table
---
items:
  - name: title
    type: "string"
    default: "—"
    description: Main text.
  - name: description
    type: "string"
    default: undefined
    description: Second line, truncated to one line. Only shown with `type="doble"`.
  - name: type
    type: "'doble' | 'report'"
    default: "'doble'"
    description: Layout, as the Type property in Figma.
  - name: color
    type: "'default' | 'action' | 'information' | 'success' | 'warning' | 'destructive'"
    default: "'default'"
    description: Semantic color of the avatar tile.
  - name: modelValue
    type: "boolean"
    default: "false"
    description: Activated state (v-model), "Activated?" in Figma.
---
::

## Slots

| Slot | Figma layer | Content |
|---|---|---|
| `avatar` | Avatar Item | An icon; it is sized and colored for you. |
| `complementary` | Complementary | Trailing info, such as an icon and a count. |
