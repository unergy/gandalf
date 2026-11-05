---
title: GInput
description: A single-line text input field.
status: in-progress
---

# GInput

A single-line text input that wraps shadcn/ui's `Input`. Supports `v-model`, every native `<input>` attribute (`type`, `placeholder`, `disabled`, `readonly`…), and the three sizes from Figma (Input → Input Field).

## Preview

::input-preview
::

## Usage

```vue
<template>
  <GLabel for="name">Name</GLabel>
  <GInput id="name" v-model="name" placeholder="Ana Gómez" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { GInput, GLabel } from '@unergy/gandalf'

const name = ref('')
</script>
```

### Sizes

```vue
<GInput size="xs" />  <!-- 24px, 12px text -->
<GInput size="sm" />  <!-- 32px, 14px text -->
<GInput />            <!-- md: 40px, 16px text -->
```

For the label, the required asterisk and the supporting or error text below the field, compose it with [GField](/docs/field).

### Invalid

Set `aria-invalid` to show the error state. It also tells screen readers the value is invalid.

```vue
<GInput v-model="email" type="email" :aria-invalid="!isValidEmail" />
```

## GInput Props

::docs-props-table
---
items:
  - name: modelValue
    type: "string | number"
    default: undefined
    description: The input value (v-model).
  - name: defaultValue
    type: "string | number"
    default: undefined
    description: Initial value when uncontrolled.
  - name: size
    type: "'xs' | 'sm' | 'md'"
    default: "'md'"
    description: Height and text size — `xs` 24px / 12px, `sm` 32px / 14px, `md` 40px / 16px.
  - name: class
    type: "HTMLAttributes['class']"
    default: undefined
    description: Extra classes, merged with `cn()`.
---
::
