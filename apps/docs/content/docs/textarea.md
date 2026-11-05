---
title: GTextarea
description: A multi-line text input with v-model support.
status: in-progress
---

# GTextarea

A textarea that wraps shadcn/ui's `Textarea`, styled as **Input → Text Area** in Figma: the Input Field states, a 72px minimum height and 12px padding. Supports `v-model` and a `size` for the text (xs 12px, sm 14px, md 16px).

## Preview

::textarea-preview
::

## Usage

```vue
<template>
  <GTextarea v-model="message" placeholder="Type your message..." />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { GTextarea } from '@unergy/gandalf'

const message = ref('')
</script>
```

## GTextarea Props

::docs-props-table
---
items:
  - name: modelValue
    type: "string | number"
    default: undefined
    description: The textarea value (v-model).
  - name: defaultValue
    type: "string | number"
    default: undefined
    description: Initial value when uncontrolled.
  - name: size
    type: "'xs' | 'sm' | 'md'"
    default: "'md'"
    description: Text size — 12, 14 or 16px.
---
::
