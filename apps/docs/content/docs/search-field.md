---
title: GSearchField
description: A search box with a search icon and a clear button.
status: in-progress
---

# GSearchField

A search box: a field with a search icon at the start and, once there is text, a button to clear it. It follows **Input → Search Field** in Figma, and is the same box shown at the top of a list in Figma's "Menu & Search" (used by `GKitCombobox`).

## Preview

::search-field-preview
::

## Usage

```vue
<template>
  <GSearchField v-model="query" placeholder="Search projects" @clear="reset" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { GSearchField } from '@unergy-dev/gandalf'

const query = ref('')
</script>
```

Native attributes (`id`, `name`, `aria-label`, `autofocus`…) go to the inner `<input>`.

### Sizes

| `size` | Height | Text |
|---|---|---|
| `md` (default) | 40px | 16px |
| `sm` | 32px | 12px |
| `xs` | 24px | 12px |

The `sm` size uses 12px text, as in Figma; Input Field uses 14px at that height.

## GSearchField Props

::docs-props-table
---
items:
  - name: modelValue
    type: "string"
    default: "''"
    description: The search text (v-model).
  - name: placeholder
    type: "string"
    default: "'Search'"
    description: Placeholder text.
  - name: size
    type: "'xs' | 'sm' | 'md'"
    default: "'md'"
    description: Height and text size.
  - name: disabled
    type: "boolean"
    default: "false"
    description: Disables the field.
  - name: clearLabel
    type: "string"
    default: "'Clear search'"
    description: Accessible name of the clear button.
---
::

## Events

| Event | Payload | When |
|---|---|---|
| `update:modelValue` | `string` | The text changes |
| `clear` | — | The clear button is pressed |
