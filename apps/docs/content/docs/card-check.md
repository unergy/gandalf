---
title: GCardCheck
description: Selectable cards with a circle check — Card Check and Card Toggle Box.
status: in-progress
---

# GCardCheck

Selectable cards from the **Check** page in Figma. Click toggles the activated state; each card is a checkbox for assistive technology.

- **`GCardCheck`** (Card Check): a 48px row with an optional icon, a label, an optional description and a circle check on the right.
- **`GCardToggleBox`** (Card Toggle Box): a 96px tile with the circle check on the top right and the icon and label at the bottom.

## Preview

::card-check-preview
::

## Usage

```vue
<template>
  <GCardCheck v-model="homes" label="Hogares">
    <template #icon><House /></template>
  </GCardCheck>

  <GCardToggleBox v-model="solar" label="Solar" class="w-48">
    <template #icon><Sun /></template>
  </GCardToggleBox>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { House, Sun } from 'lucide-vue-next'
import { GCardCheck, GCardToggleBox } from '@unergy/gandalf'

const homes = ref(false)
const solar = ref(true)
</script>
```

Each card holds one boolean. For a set of options, keep one `v-model` per option, or an array in the parent.

## Props

Both components take the same props.

::docs-props-table
---
items:
  - name: label
    type: "string"
    default: "—"
    description: Card text.
  - name: description
    type: "string"
    default: undefined
    description: Second line (GCardCheck only).
  - name: modelValue
    type: "boolean"
    default: "false"
    description: Activated state (v-model), "State=Activated" in Figma.
  - name: disabled
    type: "boolean"
    default: "false"
    description: Disables the card.
---
::

## Slots

| Slot | Content |
|---|---|
| `icon` | An icon before the label; it takes the card's color. |
