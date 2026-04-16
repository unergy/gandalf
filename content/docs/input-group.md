---
title: GInputGroup
description: An input group with addons, buttons, and text slots.
---

# GInputGroup

An input group component that wraps shadcn/ui's `InputGroup` primitives. Compose inputs with leading/trailing addons, buttons, and text elements.

## Preview

::input-group-preview
::

## Usage

```vue
<template>
  <GInputGroup>
    <GInputGroupAddon align="inline-start">
      <SearchIcon class="size-4 text-muted-foreground" />
    </GInputGroupAddon>
    <GInputGroupInput />
  </GInputGroup>
</template>

<script setup lang="ts">
import { SearchIcon } from 'lucide-vue-next'
import {
  GInputGroup,
  GInputGroupAddon,
  GInputGroupInput,
} from '@/components/gandalf/input-group'
</script>
```

## With Button

```vue
<template>
  <GInputGroup>
    <GInputGroupInput />
    <GInputGroupButton variant="ghost" size="xs">
      <XIcon class="size-4" />
    </GInputGroupButton>
  </GInputGroup>
</template>
```

## With Text

```vue
<template>
  <GInputGroup>
    <GInputGroupText>https://</GInputGroupText>
    <GInputGroupInput />
  </GInputGroup>
</template>
```

## With Textarea

```vue
<template>
  <GInputGroup>
    <GInputGroupTextarea />
    <GInputGroupAddon align="inline-end">
      <span class="text-xs text-muted-foreground">0/500</span>
    </GInputGroupAddon>
  </GInputGroup>
</template>
```

## Components

| Component | Description |
|---|---|
| `GInputGroup` | Root container for the input group. |
| `GInputGroupInput` | The main input element. |
| `GInputGroupTextarea` | A textarea alternative to the input. |
| `GInputGroupAddon` | Addon slot (icons, etc.) with `align` prop. |
| `GInputGroupButton` | Button inside the group with `variant` and `size` props. |
| `GInputGroupText` | Static text element (e.g. URL prefix). |
