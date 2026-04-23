---
title: GDropdown
description: A dropdown menu component with a fully-customizable slot trigger.
status: in-progress
---

# GDropdown

A dropdown menu that wraps shadcn's `DropdownMenu` primitives, exposing a default slot with `open` and `selectedOption` state so you can use any element as the trigger.

## Preview

::dropdown-preview
::

## Usage

```vue
<template>
  <GDropdown v-model="selected" :options="options" label="Status">
    <template #default="{ open, selectedOption }">
      <GBadge class="cursor-pointer gap-1">
        <span
          v-if="selectedOption?.color"
          class="size-2 rounded-full"
          :style="{ backgroundColor: selectedOption.color }"
        />
        {{ selectedOption?.label ?? 'Select status' }}
        <ChevronDown
          class="size-3 transition-transform duration-200"
          :class="{ 'rotate-180': open }"
        />
      </GBadge>
    </template>
  </GDropdown>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { GBadge } from '@/components/gandalf/badge'
import { GDropdown } from '@/components/gandalf/dropdown'
import { ChevronDown } from 'lucide-vue-next'

const selected = ref('active')

const options = [
  { label: 'Active', value: 'active', color: '#22c55e' },
  { label: 'Paused', value: 'paused', color: '#f59e0b' },
  { label: 'Inactive', value: 'inactive', color: '#ef4444' },
  { label: 'Archived', value: 'archived', color: '#6b7280', disabled: true },
]
</script>
```

## Slot

The default slot exposes the following values:

| Value            | Type             | Description                            |
| ---------------- | ---------------- | -------------------------------------- |
| `open`           | `boolean`        | Whether the dropdown is currently open |
| `selectedOption` | `Option \| null` | The currently selected option object   |

## Option type

```ts
type Option = {
  label: string
  value: string | number
  disabled?: boolean
  color?: `#${string}`
}
```

## Props

::docs-props-table
---
items:
  - name: options
    type: "Option[]"
    default: "[]"
    description: Array of options to display in the dropdown.
  - name: modelValue
    type: "string | number"
    default: undefined
    description: The currently selected value (v-model).
  - name: label
    type: string
    default: undefined
    description: Optional label shown as a section header inside the dropdown.
  - name: disabled
    type: boolean
    default: "false"
    description: When true, the trigger is disabled and the dropdown cannot be opened.
---
::
