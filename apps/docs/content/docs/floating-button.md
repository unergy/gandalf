---
title: GFloatingButton
description: A round icon button that floats over the content.
status: in-progress
---

# GFloatingButton

A 44px round icon button that floats over the content, for a main action that stays on screen (open a chat, add an item). It follows **Button → Floating Button** in Figma: white with a primary icon and the 2XL elevation at rest, XL once hovered, pressed or disabled.

## Preview

::floating-button-preview
::

## Usage

```vue
<template>
  <GFloatingButton class="fixed right-6 bottom-6" aria-label="Open chat" @click="openChat">
    <MessageCircle />
  </GFloatingButton>
</template>

<script setup lang="ts">
import { MessageCircle } from 'lucide-vue-next'
import { GFloatingButton } from '@unergy/gandalf'
</script>
```

It only holds an icon, so always give it an `aria-label`. Positioning (`fixed`, `bottom-6`…) is up to the page.

## GFloatingButton Props

::docs-props-table
---
items:
  - name: as / asChild
    type: "string | Component / boolean"
    default: "'button' / false"
    description: Render as another element or component, e.g. a router link.
---
::
