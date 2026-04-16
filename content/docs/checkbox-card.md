---
title: CheckboxCard
description: A card-style checkbox that combines a checkbox input with a label and description text. Highlights with a blue border and background when checked.
---

## Preview

::checkbox-card-preview
::

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue'
import CheckboxCard from '@/components/gandalf/kit/CheckboxCard.vue'

const enabled = ref(false)
</script>

<template>
  <CheckboxCard
    id="notifications"
    label="Enable notifications"
    description="Receive alerts when something important happens."
    v-model:checked="enabled"
  />
</template>
```

## Source

Lives in `gandalf/kit/` — it is a composed component built from `GCheckbox` and `GLabel` from `gandalf/base/`.

## Props

::docs-props-table
---
items:
  - name: id
    type: string
    default: "—"
    description: "Unique ID passed to the underlying checkbox and linked to the label via `for`."
  - name: label
    type: string
    default: "—"
    description: "Primary label text shown next to the checkbox."
  - name: description
    type: string
    default: "undefined"
    description: "Optional secondary text shown below the label."
  - name: checked
    type: "boolean | 'indeterminate'"
    default: "undefined"
    description: "Controlled checked state. Use with `@update:checked` or `v-model:checked`."
  - name: defaultChecked
    type: boolean
    default: "undefined"
    description: "Initial checked state for uncontrolled usage."
  - name: disabled
    type: boolean
    default: "false"
    description: "Disables the checkbox and prevents interaction."
---
::

## Slots

| Slot | Description |
|---|---|
| `label` | Override the label content. Receives no props. |
| `description` | Override the description content. Receives no props. |

## Events

| Event | Payload | Description |
|---|---|---|
| `update:checked` | `boolean` | Emitted when the checked state changes. |
