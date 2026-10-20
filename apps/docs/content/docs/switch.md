---
title: GSwitch
description: A toggle switch for binary on/off state.
status: in-progress
---

# GSwitch

A wrapper around Reka UI's `Switch` primitive. Supports `v-model` and is the preferred alternative to a standalone checkbox for boolean settings. The thumb shows a check/cross icon reflecting the current state.

## Preview

::switch-preview
::

## Usage

```vue
<template>
  <GLabel for="notifications" class="gap-3">
    Label
    <GSwitch id="notifications" v-model="enabled" />
  </GLabel>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { GLabel } from '@/components/gandalf/base/label'
import { GSwitch } from '@/components/gandalf/base/switch'

const enabled = ref(false)
</script>
```

## GSwitch Props

`GSwitch` extends all props from Reka UI's [`Switch`](https://reka-ui.com/docs/components/switch).

::docs-props-table
---
items:
  - name: modelValue
    type: "boolean"
    default: undefined
    description: The controlled state of the switch. Use with v-model.
  - name: defaultValue
    type: "boolean"
    default: "false"
    description: The default state when uncontrolled.
  - name: disabled
    type: "boolean"
    default: "false"
    description: When true, prevents the user from interacting with the switch.
  - name: name
    type: "string"
    default: undefined
    description: The name submitted with the form data when used inside a form.
---
::
