---
title: GLabel
description: An accessible label element for form controls.
status: in-progress
---

# GLabel

A label component that wraps shadcn/ui's `Label`. Use it with form controls for accessibility — it renders a styled `<label>` element.

## Preview

::label-preview
::

## Usage

```vue
<template>
  <div class="flex flex-col gap-2">
    <GLabel for="email">Email</GLabel>
    <input id="email" type="email" />
  </div>
</template>

<script setup lang="ts">
import { GLabel } from '@/components/gandalf/label'
</script>
```

## GLabel Props

`GLabel` extends all props from Reka UI's [`Label`](https://reka-ui.com/docs/components/label).

::docs-props-table
---
items:
  - name: for
    type: string
    default: undefined
    description: The id of the form element this label is associated with.
---
::
