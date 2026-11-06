---
title: GStepper
description: A vertical list of the steps of a flow, with the current one highlighted.
status: complete
---

# GStepper

The **Stepper** page in Figma: a vertical list of steps, each one a 24px **Step** next to its title,
joined by a line to the next step. It is built on shadcn/ui's `Stepper` (Reka UI), so the steps
are buttons that move the `v-model` and work with the keyboard.

## Preview

::stepper-preview
::

## Usage

```vue
<template>
  <GStepper v-model="step">
    <GStepperItem :step="1" title="Datos del terreno" />
    <GStepperItem :step="2" title="Documentos" />
    <GStepperItem :step="3" title="Visita" />
  </GStepper>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { GStepper, GStepperItem } from '@unergy/gandalf'

const step = ref(1)
</script>
```

## Step types

The type of each step comes from the `v-model`; you do not set it by hand.

| Figma | When | Look |
|---|---|---|
| Done | Steps before the current one, or `completed` | `base/inverse` fill with a check; the number shows on hover |
| Active | The current step | `base/inverse` fill with the number |
| Current | Steps after the current one | `base/inverse` outline with the number |
| Disabled | `disabled` | `bni/border` outline and an extra-quiet number |

The line below a step is `bni/border-loud`, and `base/inverse` once the step is done (Figma's
**Connected**). The last step has no line (**Final**).

By default the stepper is **linear**: from the current step you can go back, or forward one step.
Set `:linear="false"` to let the user jump to any step.

## GStepper Props

::docs-props-table
---
items:
  - name: modelValue
    type: "number"
    default: undefined
    description: The current step (`v-model`).
  - name: defaultValue
    type: "number"
    default: "1"
    description: The first current step when there is no `v-model`.
  - name: linear
    type: "boolean"
    default: "true"
    description: Only lets the user move to the next step, not jump ahead.
---
::

## GStepperItem Props

::docs-props-table
---
items:
  - name: step
    type: "number"
    default: undefined
    description: Position of the step, from 1. Required.
  - name: title
    type: "string"
    default: undefined
    description: Text next to the Step. Also available as the default slot.
  - name: completed
    type: "boolean"
    default: "false"
    description: Marks the step as Done even when it comes after the current one.
  - name: disabled
    type: "boolean"
    default: "false"
    description: Draws State=Disabled and takes the step out of navigation.
---
::

## Slots

| Slot | Component | Description |
|---|---|---|
| `default` | `GStepperItem` | Replaces the title. Receives `{ state }`. |
| `indicator` | `GStepperItem` | Replaces the number and the check inside the Step. |
