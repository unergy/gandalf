---
title: Select
description: An options-driven select built from the base select primitives — grouping, descriptions, colors, multi-select and a clear control.
status: complete
---

## Preview

::kit-select-preview
::

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { GKitSelect } from '@/components/gandalf/kit/select'
import type { SelectOptions } from '@/components/gandalf/kit/select'

const plan = ref<string | undefined>()

const plans: SelectOptions = [
  { label: 'Free', value: 'free' },
  { label: 'Pro', value: 'pro' },
]
</script>

<template>
  <GKitSelect v-model="plan" :options="plans" clearable />
</template>
```

## Select or Combobox?

Both take the same `options` shape, so swapping one for the other is a rename.

| | `GKitSelect` | `GKitCombobox` |
|---|---|---|
| Search box | No | Yes, accent-insensitive |
| Server-side search | No | Yes, via `@search` |
| Good for | A short, known list | A long list, or one that is fetched |

Reach for the select when every option fits on screen. Once the user would have to scroll to find
something, the missing search box is the problem, and `GKitCombobox` is the answer.

## Descriptions and colors

An option can carry a `description` (a second line in the list) and a `color` (a dot in the list,
and the badge tint when `multiple`). The trigger shows the label alone — the description stays in
the list.

```ts
const statuses: SelectOptions = [
  { label: 'Pagada', value: 'paid', color: '#10b981' },
  { label: 'Vencida', value: 'overdue', color: '#ef4444' },
  { label: 'Anulada', value: 'void', color: '#94a3b8', disabled: true },
]
```

## Grouping

Pass groups instead of a flat array. Do not mix the two shapes in one array — the first entry
decides how the whole array is read.

```ts
const options: SelectOptions = [
  { label: 'Andina', options: [{ label: 'Bogotá', value: 'bog' }] },
  { label: 'Caribe', options: [{ label: 'Barranquilla', value: 'baq' }] },
]
```

## Multiple

`multiple` turns `modelValue` into an array. The trigger shows a badge per selection up to
`maxDisplay`, then collapses the rest into a `+n` counter.

```vue
<GKitSelect v-model="regions" :options="options" multiple :max-display="2" clearable />
```

## Forms

`name` submits the selection with a surrounding form through a native hidden `<select>`, handled
by Reka — including one entry per value when `multiple` is set.

```vue
<GKitSelect v-model="plan" :options="plans" name="plan" required />
```

## Source

Lives in `gandalf/kit/` — composed from `GSelect*`, `GBadge` and `GButton` in `gandalf/base/`.

## Props

::docs-props-table
---
items:
  - name: options
    type: "SelectOptions"
    default: "—"
    description: "The list to choose from. Either `SelectOption[]` or `SelectOptionGroup[]`."
  - name: modelValue
    type: "string | number | (string | number)[]"
    default: "undefined"
    description: "The selection. Use with `v-model`. An array when `multiple` is set."
  - name: open
    type: boolean
    default: "false"
    description: "Popover open state. Use with `v-model:open`."
  - name: multiple
    type: boolean
    default: "false"
    description: "Allows selecting more than one option."
  - name: placeholder
    type: string
    default: "'Select an option...'"
    description: "Shown on the trigger while nothing is selected."
  - name: emptyMessage
    type: string
    default: "'No options available.'"
    description: "Shown in place of the list when `options` is empty."
  - name: disabled
    type: boolean
    default: "false"
    description: "Blocks the trigger."
  - name: clearable
    type: boolean
    default: "false"
    description: "Adds a clear control to the trigger once something is selected."
  - name: clearLabel
    type: string
    default: "'Clear selection'"
    description: "Accessible label for the clear control."
  - name: loading
    type: boolean
    default: "false"
    description: "Renders a spinner in place of the list."
  - name: name
    type: string
    default: "undefined"
    description: "Submits with a surrounding form, as a native hidden select."
  - name: required
    type: boolean
    default: "false"
    description: "Marks the hidden select required. Only meaningful alongside `name`."
  - name: maxDisplay
    type: number
    default: "3"
    description: "How many badges the trigger shows before collapsing into a counter. `multiple` only."
  - name: size
    type: "'sm' | 'default'"
    default: "'default'"
    description: "Trigger height, matching shadcn's select sizes."
  - name: class
    type: string
    default: "undefined"
    description: "Merged onto the trigger."
  - name: contentClass
    type: string
    default: "undefined"
    description: "Merged onto the popover content."
---
::

## Option

| Field | Type | Description |
|---|---|---|
| `label` | `string` | Shown in the list and on the trigger. |
| `value` | `string \| number` | The value written to `v-model`. |
| `disabled` | `boolean` | Blocks selection. The option stays visible. |
| `color` | `` `#${string}` `` | Renders a dot in the list and tints the badge when `multiple`. |
| `description` | `string` | Second line under the label, in the list only. |

## Slots

| Slot | Props | Description |
|---|---|---|
| `option` | `option`, `selected` | Replaces the body of each row. The check indicator stays. |
| `empty` | — | Replaces the empty state. |
| `loading` | — | Replaces the spinner. |

## Events

| Event | Payload | Description |
|---|---|---|
| `update:modelValue` | `string \| number \| (string \| number)[]` | Emitted when the selection changes. |
| `update:open` | `boolean` | Emitted when the popover opens or closes. |
| `select` | `SelectOption` | The row the user picked or unpicked. Never fires on mount or on a programmatic set. |
