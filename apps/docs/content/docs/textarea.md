---
title: GTextarea
description: A multi-line text input with v-model support.
status: in-progress
---

# GTextarea

A textarea component that wraps shadcn/ui's `Textarea`. Supports `v-model` for two-way binding.

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
import { GTextarea } from '@/components/gandalf/textarea'

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
---
::
