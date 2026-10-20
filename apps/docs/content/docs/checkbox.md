---
title: GCheckbox
description: A checkbox input with v-model support for checked state.
status: in-progress
---

# GCheckbox

A checkbox component that wraps shadcn/ui's `Checkbox`. Supports `v-model:checked` for two-way binding and indeterminate state.

## Preview

::checkbox-preview
::

## Usage

```vue
<template>
  <div class="flex items-center gap-2">
    <GCheckbox id="terms" v-model:checked="accepted" />
    <GLabel for="terms">Accept terms and conditions</GLabel>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { GCheckbox } from '@/components/gandalf/checkbox'
import { GLabel } from '@/components/gandalf/label'

const accepted = ref(false)
</script>
```

## GCheckbox Props

`GCheckbox` extends all props from Reka UI's [`CheckboxRoot`](https://reka-ui.com/docs/components/checkbox).

::docs-props-table
---
items:
  - name: checked
    type: "boolean | 'indeterminate'"
    default: undefined
    description: The checked state (v-model:checked).
  - name: defaultChecked
    type: boolean
    default: "false"
    description: Initial checked state when uncontrolled.
  - name: disabled
    type: boolean
    default: "false"
    description: Disables the checkbox.
  - name: required
    type: boolean
    default: "false"
    description: Marks the checkbox as required for form validation.
---
::
