---
title: GMiniature
description: A selectable 128px thumbnail.
status: in-progress
---

# GMiniature

A selectable 128px thumbnail, for picking an image or a template. Click toggles its activated state. It follows the **Card → Miniature** component in Figma.

## Preview

::miniature-preview
::

## Usage

```vue
<template>
  <GMiniature v-model="active" src="/thumbnails/plant.jpg" alt="Solar plant" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { GMiniature } from '@unergy-dev/gandalf'

const active = ref(false)
</script>
```

Without `src` it shows the dark placeholder from the design. For anything other than an image, use the default slot.

## GMiniature Props

::docs-props-table
---
items:
  - name: src
    type: "string"
    default: undefined
    description: Image URL, cropped to fill the square.
  - name: alt
    type: "string"
    default: "''"
    description: Image description for screen readers.
  - name: modelValue
    type: "boolean"
    default: "false"
    description: Activated state (v-model), "Property 1=Activated" in Figma.
---
::
