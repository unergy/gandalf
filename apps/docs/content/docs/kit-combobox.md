---
title: Combobox
description: A searchable select built from the base combobox primitives — grouping, multi-select, accent-insensitive search, and server-side search.
status: complete
---

## Preview

::kit-combobox-preview
::

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { GKitCombobox } from '@/components/gandalf/kit/combobox'
import type { ComboboxOptions } from '@/components/gandalf/kit/combobox'

const framework = ref<string | undefined>()

const frameworks: ComboboxOptions = [
  { label: 'Next.js', value: 'nextjs' },
  { label: 'Nuxt', value: 'nuxt' },
  { label: 'Astro', value: 'astro' },
]
</script>

<template>
  <GKitCombobox v-model="framework" :options="frameworks" clearable />
</template>
```

## Search

The default matcher folds accents and case before comparing, and matches against the label, the
description and any `keywords`. This is the reason the component exists rather than the raw
primitives: `bogota` finds `Bogotá`, `medellin` finds `Medellín`, and `munoz` finds `Muñoz`.
Without folding, the list looks empty for a term the user can read on screen.

Client-side filtering happens in the component, not in Reka — the list is told to `ignore-filter`
and only matching options are rendered. Pass `filter` to replace the matcher entirely.

```vue
<GKitCombobox :options="options" :filter="(option, term) => option.label.startsWith(term)" />
```

## Grouping

Pass groups instead of a flat array. Do not mix the two shapes in one array — the first entry
decides how the whole array is read.

```ts
const options: ComboboxOptions = [
  {
    label: 'Andina',
    options: [
      { label: 'Bogotá', value: 'bog' },
      { label: 'Medellín', value: 'mde' },
    ],
  },
  { label: 'Caribe', options: [{ label: 'Barranquilla', value: 'baq' }] },
]
```

## Multiple

`multiple` turns `modelValue` into an array. The trigger shows a badge per selection up to
`maxDisplay`, then collapses the rest into a `+n` counter. The popover stays open while picking.

```vue
<GKitCombobox v-model="cities" :options="options" multiple :max-display="2" clearable />
```

## Server-side search

`@search` fires with the term, debounced by `searchDebounce`. Hand the results back through
`options` and set `should-filter="false"` so the list is not filtered twice.

```vue
<script setup lang="ts">
const options = ref<ComboboxOptions>([])
const loading = ref(false)

async function onSearch(term: string) {
  loading.value = true
  options.value = await fetchClientes(term)
  loading.value = false
}
</script>

<template>
  <GKitCombobox
    v-model="cliente"
    :options="options"
    :loading="loading"
    :should-filter="false"
    :search-debounce="300"
    @search="onSearch"
  />
</template>
```

Closing the popover clears the term and emits `search` with `''`, undebounced — otherwise an empty
search box would sit above a list still filtered by a term nobody can see.

## Forms

`name` submits the selection with a surrounding form via a hidden input, handled by Reka.

```vue
<GKitCombobox v-model="framework" :options="frameworks" name="framework" required />
```

## Source

Lives in `gandalf/kit/` — composed from `GCombobox*`, `GBadge` and `GButton` in `gandalf/base/`.

## Props

::docs-props-table
---
items:
  - name: options
    type: "ComboboxOptions"
    default: "—"
    description: "The list to choose from. Either `ComboboxOption[]` or `ComboboxOptionGroup[]`."
  - name: modelValue
    type: "string | number | (string | number)[]"
    default: "undefined"
    description: "The selection. Use with `v-model`. An array when `multiple` is set."
  - name: open
    type: boolean
    default: "false"
    description: "Popover open state. Use with `v-model:open`."
  - name: search
    type: string
    default: "''"
    description: "The search term. Use with `v-model:search` to read or reset it."
  - name: multiple
    type: boolean
    default: "false"
    description: "Allows selecting more than one option."
  - name: placeholder
    type: string
    default: "'Select an option...'"
    description: "Shown on the trigger while nothing is selected."
  - name: searchPlaceholder
    type: string
    default: "'Search...'"
    description: "Shown in the search box."
  - name: emptyMessage
    type: string
    default: "'No results found.'"
    description: "Shown when the search matches nothing."
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
    description: "Renders a spinner in place of the list. Pair with `@search`."
  - name: name
    type: string
    default: "undefined"
    description: "Submits with a surrounding form, as a hidden input."
  - name: required
    type: boolean
    default: "false"
    description: "Marks the hidden input required. Only meaningful alongside `name`."
  - name: shouldFilter
    type: boolean
    default: "true"
    description: "Whether to filter on the client. Set `false` when the server already filtered."
  - name: filter
    type: "(option, search) => boolean"
    default: "undefined"
    description: "Replaces the built-in matcher. Return `true` to keep the option."
  - name: searchDebounce
    type: number
    default: "0"
    description: "Milliseconds to wait before the `search` event fires. `0` emits per keystroke."
  - name: maxDisplay
    type: number
    default: "3"
    description: "How many badges the trigger shows before collapsing into a counter. `multiple` only."
  - name: class
    type: string
    default: "undefined"
    description: "Merged onto the trigger button."
  - name: contentClass
    type: string
    default: "undefined"
    description: "Merged onto the popover content."
  - name: listClass
    type: string
    default: "undefined"
    description: "Merged onto the scrolling list. Use it to change the max height."
---
::

## Option

| Field | Type | Description |
|---|---|---|
| `label` | `string` | Shown in the list and on the trigger. |
| `value` | `string \| number` | The value written to `v-model`. |
| `disabled` | `boolean` | Blocks selection. The option stays visible and searchable. |
| `color` | `` `#${string}` `` | Renders a dot in the list and tints the badge when `multiple`. |
| `description` | `string` | Second line under the label. Searched along with it. |
| `keywords` | `string[]` | Extra terms that match without being shown — synonyms, codes, an old name. |

## Slots

| Slot | Props | Description |
|---|---|---|
| `trigger` | `open`, `selected`, `disabled`, `clear` | Replaces the whole trigger. |
| `option` | `option`, `selected` | Replaces the body of each row. The check indicator stays. |
| `empty` | — | Replaces the empty state. |
| `loading` | — | Replaces the spinner. |
| `footer` | `selected`, `visible`, `clear` | Rendered below the list, inside the popover. |

## Events

| Event | Payload | Description |
|---|---|---|
| `update:modelValue` | `string \| number \| (string \| number)[]` | Emitted when the selection changes. |
| `update:open` | `boolean` | Emitted when the popover opens or closes. |
| `update:search` | `string` | Emitted as the term changes. |
| `select` | `ComboboxOption` | The row the user picked or unpicked. Never fires on mount or on a programmatic set. |
| `search` | `string` | The term, debounced by `searchDebounce`. |
