---
title: GButtonGroup
description: A button group component with separator and text sub-components.
---

# GButtonGroup

A button group that wraps shadcn/ui's `ButtonGroup` primitives. Groups buttons together with optional separators and text elements.

## Usage

```vue
<template>
  <GButtonGroup>
    <Button variant="outline">Left</Button>
    <GButtonGroupSeparator />
    <Button variant="outline">Center</Button>
    <GButtonGroupSeparator />
    <Button variant="outline">Right</Button>
  </GButtonGroup>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { GButtonGroup, GButtonGroupSeparator } from '@/components/gandalf/button-group'
</script>
```

## With Text

```vue
<template>
  <GButtonGroup>
    <Button variant="outline">Action</Button>
    <GButtonGroupText>or</GButtonGroupText>
    <Button variant="outline">Cancel</Button>
  </GButtonGroup>
</template>
```

## Components

| Component | Description |
|---|---|
| `GButtonGroup` | Root container that groups buttons together. |
| `GButtonGroupSeparator` | Visual separator between buttons. |
| `GButtonGroupText` | Text element displayed between buttons. |

## GButtonGroup Props

::docs-props-table
---
items:
  - name: orientation
    type: "'horizontal' | 'vertical'"
    default: "'horizontal'"
    description: Orientation of the button group layout.
---
::
