---
title: GLabel
description: An accessible label element for form controls, with a required indicator and disabled state.
status: complete
---

# GLabel

An accessible label component built on top of `Label` from shadcn/ui. Renders a styled `<label>` element that associates with a form control via the `for` prop. Supports an optional required indicator and a disabled state.

## Preview

::label-preview
::

## Usage

```vue
<template>
  <div class="flex flex-col gap-2">
    <GLabel for="email">Email address</GLabel>
    <input id="email" type="email" />
  </div>
</template>

<script setup lang="ts">
import { GLabel } from '@/components/gandalf/base/label'
</script>
```

## Variants

### Required indicator

```vue
<GLabel for="name" required>Full name</GLabel>
```

### Disabled

Both the label text and the required asterisk adopt the disabled appearance.

```vue
<GLabel for="name" required disabled>Full name</GLabel>
```

## Props

::docs-props-table
---
items:
  - name: for
    type: string
    default: undefined
    description: The id of the form element this label is associated with.
  - name: required
    type: boolean
    default: "false"
    description: When true, appends a red asterisk (*) to indicate the associated field is required.
  - name: disabled
    type: boolean
    default: "false"
    description: When true, applies reduced opacity and disables cursor interactions on both the label and the required asterisk.
---
::
