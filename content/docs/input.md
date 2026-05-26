---
title: GInput
description: A single-line text input field with size variants and full native attribute delegation.
status: complete
---

# GInput

A wrapper around shadcn/ui's `Input`. Supports all native `<input>` attributes, `v-model`, size variants, and consistent visual states (default, focus, disabled, error).

## Preview

::input-preview
::

## Usage

```vue
<template>
  <div class="flex flex-col gap-1.5">
    <GLabel for="name">Name</GLabel>
    <GInput id="name" v-model="name" placeholder="Enter your name…" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { GInput } from '@/components/gandalf/base/input'
import { GLabel } from '@/components/gandalf/base/label'

const name = ref('')
</script>
```

## Sizes

```vue
<GInput size="sm" placeholder="Small…" />
<GInput placeholder="Default…" />
<GInput size="lg" placeholder="Large…" />
```

## Input types

Any native `type` attribute is forwarded directly to the underlying `<input>` element.

```vue
<GInput type="email" placeholder="you@example.com" />
<GInput type="password" placeholder="Password" />
<GInput type="number" placeholder="0" />
<GInput type="search" placeholder="Search…" />
```

## States

```vue
<GInput placeholder="Disabled" disabled />
<GInput model-value="Read-only value" readonly />
```

## With GField

Pair with `GField` for labels, descriptions, and error messages.

```vue
<GField>
  <GFieldLabel for="email">Email</GFieldLabel>
  <GFieldContent>
    <GInput id="email" v-model="email" type="email" placeholder="you@example.com" />
  </GFieldContent>
  <GFieldDescription>We'll never share your email.</GFieldDescription>
</GField>
```

## Props

::docs-props-table
---
items:
  - name: modelValue
    type: "string | number"
    default: undefined
    description: Bound value. Use with v-model.
  - name: defaultValue
    type: "string | number"
    default: undefined
    description: Uncontrolled initial value when not using v-model.
  - name: type
    type: string
    default: "'text'"
    description: Native input type (text, email, password, number, search, etc.).
  - name: placeholder
    type: string
    default: undefined
    description: Placeholder text shown when the input is empty.
  - name: size
    type: "'sm' | 'default' | 'lg'"
    default: "'default'"
    description: Controls the height and font size of the input.
  - name: disabled
    type: boolean
    default: "false"
    description: Disables the input and applies reduced opacity.
  - name: readonly
    type: boolean
    default: "false"
    description: Makes the input non-editable while keeping it focusable.
  - name: required
    type: boolean
    default: "false"
    description: Marks the input as required for native form validation.
  - name: class
    type: "HTMLAttributes['class']"
    default: undefined
    description: Additional CSS classes merged with the component's own classes.
---
::

## Emits

::docs-props-table
---
items:
  - name: update:modelValue
    type: "string | number"
    default: ""
    description: Emitted when the input value changes.
---
::
