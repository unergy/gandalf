---
title: GCombobox
description: A searchable select component built on top of shadcn/ui's Combobox primitives.
---

# GCombobox

A combobox component that wraps shadcn/ui's `Combobox` primitives (Reka UI under the hood). It provides a searchable dropdown with keyboard navigation, filtering, and selection — fully composable via sub-components.

## Usage

```vue
<template>
  <GCombobox v-model="selected" v-model:open="open">
    <GComboboxAnchor>
      <GComboboxInput placeholder="Search framework..." />
      <GComboboxTrigger>
        <ChevronsUpDown class="size-4 shrink-0 opacity-50" />
      </GComboboxTrigger>
    </GComboboxAnchor>

    <GComboboxList>
      <GComboboxViewport>
        <GComboboxEmpty>No framework found.</GComboboxEmpty>
        <GComboboxGroup heading="Frameworks">
          <GComboboxItem
            v-for="framework in frameworks"
            :key="framework.value"
            :value="framework.value"
          >
            {{ framework.label }}
            <GComboboxItemIndicator>
              <Check class="size-4" />
            </GComboboxItemIndicator>
          </GComboboxItem>
        </GComboboxGroup>
      </GComboboxViewport>
    </GComboboxList>
  </GCombobox>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Check, ChevronsUpDown } from 'lucide-vue-next'
import {
  GCombobox,
  GComboboxAnchor,
  GComboboxInput,
  GComboboxTrigger,
  GComboboxList,
  GComboboxViewport,
  GComboboxEmpty,
  GComboboxGroup,
  GComboboxItem,
  GComboboxItemIndicator,
} from '@/components/gandalf/combobox'

const selected = ref('')
const open = ref(false)

const frameworks = [
  { label: 'Next.js', value: 'nextjs' },
  { label: 'Nuxt', value: 'nuxt' },
  { label: 'Remix', value: 'remix' },
  { label: 'Astro', value: 'astro' },
]
</script>
```

## Components

| Component | Description |
|---|---|
| `GCombobox` | Root container. Manages selection, search, and open state. Supports `v-model`, `v-model:open`, and `v-model:search-term`. |
| `GComboboxAnchor` | Wraps the input and trigger area. |
| `GComboboxInput` | Search input for filtering options. |
| `GComboboxTrigger` | Optional trigger button (e.g. chevron icon). |
| `GComboboxList` | Popover container for the dropdown content. |
| `GComboboxViewport` | Scrollable viewport inside the list. |
| `GComboboxItem` | A selectable option. |
| `GComboboxItemIndicator` | Indicator shown when an item is selected (e.g. check icon). |
| `GComboboxEmpty` | Content shown when no items match the search. |
| `GComboboxGroup` | Groups items with an optional heading. |
| `GComboboxSeparator` | Visual separator between groups. |

## GCombobox Props

`GCombobox` extends all props from Reka UI's [`ComboboxRoot`](https://reka-ui.com/docs/components/combobox).

::docs-props-table
---
items:
  - name: modelValue
    type: "AcceptableValue | AcceptableValue[]"
    default: undefined
    description: The currently selected value (v-model).
  - name: open
    type: boolean
    default: "false"
    description: Whether the combobox dropdown is open (v-model:open).
  - name: searchTerm
    type: string
    default: "''"
    description: The current search term (v-model:search-term).
  - name: multiple
    type: boolean
    default: "false"
    description: Allow selecting multiple values.
  - name: disabled
    type: boolean
    default: "false"
    description: Disables the combobox.
  - name: filterFunction
    type: "(options: string[], term: string) => string[]"
    default: undefined
    description: Custom filter function to override default filtering behavior.
---
::
