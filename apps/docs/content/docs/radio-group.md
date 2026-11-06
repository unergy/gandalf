---
title: GRadioGroup
description: A group of radio buttons for single-option selection.
status: in-progress
---

# GRadioGroup

A group of options where only one can be on. It wraps shadcn/ui's `RadioGroup`; each `GRadioGroupItem` is drawn as **Check, Type=Circle** in Figma: an outline circle that turns purple with a check when selected.

## Preview

::radio-group-preview
::

## Usage

```vue
<template>
  <GRadioGroup v-model="plan">
    <div class="flex items-center gap-2">
      <GRadioGroupItem id="plan-monthly" value="monthly" />
      <GLabel for="plan-monthly">Monthly</GLabel>
    </div>
    <div class="flex items-center gap-2">
      <GRadioGroupItem id="plan-yearly" value="yearly" />
      <GLabel for="plan-yearly">Yearly</GLabel>
    </div>
  </GRadioGroup>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { GLabel, GRadioGroup, GRadioGroupItem } from '@unergy-dev/gandalf'

const plan = ref('monthly')
</script>
```

## GRadioGroup Props

::docs-props-table
---
items:
  - name: modelValue
    type: "string"
    default: undefined
    description: The selected value (v-model).
  - name: disabled
    type: "boolean"
    default: "false"
    description: Disables every item.
  - name: orientation
    type: "'vertical' | 'horizontal'"
    default: undefined
    description: Arrow-key direction.
---
::

## GRadioGroupItem Props

::docs-props-table
---
items:
  - name: value
    type: "string"
    default: "—"
    description: The value this item selects.
  - name: disabled
    type: "boolean"
    default: "false"
    description: Disables this item.
---
::
