---
title: GNavigationButton
description: A button that shows the current level and opens a menu to switch to another.
status: in-progress
---

# GNavigationButton

A button that shows where you are (a level, a project, a role) and opens a menu to switch. It follows **Button → Navegation Buttons** in Figma: the trigger shows the selected option's title and description, and the menu lists options as *Menu Item Description* rows with a check on the current one.

## Preview

::navigation-button-preview
::

## Usage

```vue
<template>
  <GNavigationButton v-model="level" :options="levels" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { GNavigationButton } from '@unergy-dev/gandalf'
import type { NavigationOptionGroup } from '@unergy-dev/gandalf'

const levels: NavigationOptionGroup[] = [
  { options: [{ label: 'Main level', value: 'main', description: 'Description for level' }] },
  {
    options: [
      { label: 'Sub level 1', value: 'sub-1', description: 'Description for sublevel' },
      { label: 'Sub level 2', value: 'sub-2', description: 'Description for sublevel' },
    ],
  },
]
const level = ref('sub-1')
</script>
```

`options` takes a flat list or groups; groups are separated by a line in the menu.

### Icon and color

The second variant in Figma shows an icon and a colored label (the "Rol" example). Put the icon in the `icon` slot and tint the text with `color`:

```vue
<GNavigationButton v-model="role" :options="roles" color="success">
  <template #icon><Users /></template>
</GNavigationButton>
```

## GNavigationButton Props

::docs-props-table
---
items:
  - name: options
    type: "NavigationOption[] | NavigationOptionGroup[]"
    default: "—"
    description: "Options as `{ label, value, description?, disabled? }`, or groups of them."
  - name: modelValue
    type: "string | number"
    default: undefined
    description: The selected value (v-model).
  - name: open
    type: "boolean"
    default: "false"
    description: Whether the menu is open (v-model:open).
  - name: placeholder
    type: "string"
    default: "'Select'"
    description: Trigger text when nothing is selected.
  - name: color
    type: "'default' | 'action' | 'information' | 'success' | 'warning' | 'destructive'"
    default: "'default'"
    description: Semantic color of the trigger text.
  - name: disabled
    type: "boolean"
    default: "false"
    description: Disables the trigger.
---
::
