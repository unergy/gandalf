---
title: GProgressBar
description: A horizontal bar with its percentage, for completion or loading state.
status: complete
---

# GProgressBar

The **Progress bar** page in Figma. A 6px square track in `base/base-loud` that fills with
`success/success`, followed by the value as a percentage in `Body/sm`.

Figma's `State` property (Zero / Low / Middle / Long / Completed) is only a value, so in code it
is the `modelValue`.

## Preview

::progress-bar-preview
::

## Usage

```vue
<template>
  <GProgressBar :model-value="75" />
</template>

<script setup lang="ts">
import { GProgressBar } from '@unergy-dev/gandalf'
</script>
```

### Values out of 100

`max` normalises the value, and the label still shows a percentage.

```vue
<GProgressBar :model-value="3" :max="8" />
<!-- 37.50% -->
```

### A different label

```vue
<GProgressBar :model-value="60" label="3 of 5 steps" />
<GProgressBar :model-value="60" :show-label="false" />

<GProgressBar :model-value="60">
  <template #label>
    <GBadge size="xs" color="success">On track</GBadge>
  </template>
</GProgressBar>
```

## GProgressBar Props

::docs-props-table
---
items:
  - name: modelValue
    type: "number"
    default: "0"
    description: Progress, from 0 to max.
  - name: max
    type: "number"
    default: "100"
    description: Value that counts as 100 %.
  - name: label
    type: "string"
    default: "undefined"
    description: Replaces the percentage next to the bar.
  - name: showLabel
    type: "boolean"
    default: "true"
    description: Hides the label when false.
  - name: class
    type: "string"
    default: "undefined"
    description: Classes for the wrapper; set the width here.
  - name: trackClass
    type: "string"
    default: "undefined"
    description: Classes for the track.
  - name: labelClass
    type: "string"
    default: "undefined"
    description: Classes for the label.
---
::

## Slots

| Slot    | Description                                      |
| ------- | ------------------------------------------------ |
| `label` | Replaces the text next to the bar with any node. |
