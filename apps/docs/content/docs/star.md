---
title: GStar
description: A favorite toggle drawn as a star.
status: in-progress
---

# GStar

A toggle to mark something as a favorite. It follows **Check → Star** in Figma: an outline star that fills yellow (#FDC700) when on.

## Preview

::star-preview
::

## Usage

```vue
<template>
  <GStar v-model="favorite" label="Mark project as favorite" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { GStar } from '@unergy/gandalf'

const favorite = ref(false)
</script>
```

## GStar Props

::docs-props-table
---
items:
  - name: modelValue
    type: "boolean"
    default: "false"
    description: Whether it is marked (v-model).
  - name: size
    type: "'md' | 'sm'"
    default: "'md'"
    description: 16px or 14px, as in Figma.
  - name: label
    type: "string"
    default: "'Favorite'"
    description: Accessible name; the button only shows an icon.
  - name: disabled
    type: "boolean"
    default: "false"
    description: Disables the toggle.
---
::
