---
title: Date Picker
description: A date field built from the base calendar and popover — plain `Date` in and out, bounds, disabled days and a clear control.
status: complete
---

## Preview

::kit-date-picker-preview
::

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { GKitDatePicker } from '@/components/gandalf/kit/date-picker'
import type { DatePickerModelValue } from '@/components/gandalf/kit/date-picker'

const issued = ref<DatePickerModelValue>()
</script>

<template>
  <GKitDatePicker v-model="issued" clearable placeholder="Fecha de emisión..." />
</template>
```

## What `v-model` carries

**In**: a `Date`, or an ISO `'YYYY-MM-DD'` string — the shape the platform's APIs speak, so a value
straight off a response can be bound without converting it first. A full ISO timestamp is read by
its date part.

**Out**: always a `Date`, at local midnight. One type to read, whatever went in.

```ts
const fecha = ref<DatePickerModelValue>('2026-09-03') // from the API
// after the user picks a day → Date(2026, 8, 14)
```

Going back to the wire, use `toISODate` rather than `toISOString()`, which converts to UTC first
and reports the previous day for every local midnight in Colombia.

```ts
import { toISODate } from '@/components/gandalf/kit/date-picker'

await api.post('/facturas', { fecha: toISODate(fecha.value) }) // '2026-09-14'
```

An unparseable value is read as no value. An invalid date in one field should not take a whole
form down.

## Bounds and disabled days

`min` and `max` grey out everything outside the range; `isDateDisabled` blocks individual days and
is written in native `Date` terms, like the rest of this component's API.

```vue
<script setup lang="ts">
const today = new Date()

function isWeekend(date: Date) {
  return date.getDay() === 0 || date.getDay() === 6
}
</script>

<template>
  <GKitDatePicker v-model="due" :min="today" :is-date-disabled="isWeekend" />
</template>
```

## Reaching another year

The calendar opens on the month of the selected date, or on today when there is none. For a date
far from either — a birthdate — paging one month at a time is unusable: `layout` puts month and
year dropdowns in the header.

```vue
<GKitDatePicker v-model="birthday" layout="month-and-year" :max="today" />
```

## How the date reads

`format` takes any `Intl.DateTimeFormat` options and `locale` decides the language of both the
trigger label and the calendar. The locale defaults to `es-CO` — the platform is Colombian, and
its users read dates in Spanish. Weeks start on Monday for the same reason.

```vue
<GKitDatePicker v-model="fecha" :format="{ dateStyle: 'long' }" />
<GKitDatePicker v-model="fecha" locale="en-US" :week-starts-on="0" />
```

## Shortcuts

The `footer` slot renders under the calendar and receives `select`, so a preset row is a few
buttons rather than a new component.

```vue
<GKitDatePicker v-model="due">
  <template #footer="{ select, clear }">
    <div class="flex gap-1">
      <GButton variant="ghost" size="sm" @click="select(new Date())">Hoy</GButton>
      <GButton variant="ghost" size="sm" @click="clear">Limpiar</GButton>
    </div>
  </template>
</GKitDatePicker>
```

## Another trigger

The `trigger` slot replaces the button entirely, keeping the popover behaviour. Wrap your own
element in `GPopoverTrigger` with `as-child`.

```vue
<GKitDatePicker v-model="fecha">
  <template #trigger="{ label, open }">
    <GPopoverTrigger as-child>
      <GBadge class="cursor-pointer gap-1" :color="open ? 'action' : 'default'">
        {{ label || 'Sin fecha' }}
      </GBadge>
    </GPopoverTrigger>
  </template>
</GKitDatePicker>
```

## Forms

`name` renders a hidden input carrying the `YYYY-MM-DD` value, so the field submits with a
surrounding form. There is no `required` prop on purpose: hidden inputs are barred from constraint
validation, so it would look like a guard and never fire. Validate the bound value instead — with
Vee-validate and Zod, like every other field on the platform.

```vue
<GKitDatePicker v-model="fecha" name="fecha_emision" />
```

## Source

Lives in `gandalf/kit/` — composed from `GCalendar`, `GPopover*` and `GButton` in `gandalf/base/`.
The conversion helpers are exported alongside the component: `toISODate`, `toCalendarDate`,
`toNativeDate`, `formatDate`.

Single dates only. A range picker is a different primitive (`RangeCalendar`) and a different model
shape — it will land as its own component rather than as a mode on this one.

## Props

::docs-props-table
---
items:
  - name: modelValue
    type: "Date | string | undefined"
    default: "undefined"
    description: "The picked date. Use with `v-model`. A string is read as ISO; a Date is always written back."
  - name: open
    type: boolean
    default: "false"
    description: "Popover open state. Use with `v-model:open`."
  - name: placeholder
    type: string
    default: "'Select a date...'"
    description: "Shown on the trigger while nothing is picked."
  - name: disabled
    type: boolean
    default: "false"
    description: "Blocks the trigger."
  - name: clearable
    type: boolean
    default: "false"
    description: "Adds a clear control to the trigger once a date is picked."
  - name: clearLabel
    type: string
    default: "'Clear date'"
    description: "Accessible label for the clear control."
  - name: min
    type: "Date | string"
    default: "undefined"
    description: "Earliest date that can be picked. Everything before it is greyed out."
  - name: max
    type: "Date | string"
    default: "undefined"
    description: "Latest date that can be picked. Everything after it is greyed out."
  - name: isDateDisabled
    type: "(date: Date) => boolean"
    default: "undefined"
    description: "Keeps individual days out of reach — weekends, holidays. Return true to disable."
  - name: locale
    type: string
    default: "'es-CO'"
    description: "Locale for the month names, the weekday headers and the trigger label."
  - name: format
    type: "Intl.DateTimeFormatOptions"
    default: "{ dateStyle: 'medium' }"
    description: "How the picked date reads on the trigger."
  - name: weekStartsOn
    type: "0 | 1 | 2 | 3 | 4 | 5 | 6"
    default: "1"
    description: "First column of the week. 1 is Monday, which is how a Colombian calendar reads."
  - name: layout
    type: "'month-and-year' | 'month-only' | 'year-only'"
    default: "undefined"
    description: "Swaps the static heading for month and/or year dropdowns, for jumping across years."
  - name: closeOnSelect
    type: boolean
    default: "true"
    description: "Whether picking a date closes the popover. Deselecting never closes it."
  - name: name
    type: string
    default: "undefined"
    description: "Submits with a surrounding form, as a hidden input carrying the YYYY-MM-DD value."
  - name: size
    type: "'sm' | 'default'"
    default: "'default'"
    description: "Trigger height, matching the button sizes."
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

## Slots

| Slot | Props | Description |
|---|---|---|
| `trigger` | `open`, `value`, `label`, `disabled`, `clear` | Replaces the trigger button. Wrap your element in `GPopoverTrigger as-child`. |
| `footer` | `value`, `select`, `clear` | Renders under the calendar. For presets like "Hoy". |

## Events

| Event | Payload | Description |
|---|---|---|
| `update:modelValue` | `Date \| undefined` | Emitted when the picked date changes. `undefined` when cleared or deselected. |
| `update:open` | `boolean` | Emitted when the popover opens or closes. |

There is no `select` event: a date carries no metadata beyond its value, so it would say exactly
what `update:modelValue` already says.

## Helpers

| Function | Signature | Description |
|---|---|---|
| `toISODate` | `(value: Date \| string \| undefined) => string` | The `YYYY-MM-DD` form, built from local fields. `''` for no value. |
| `toCalendarDate` | `(value: Date \| string \| undefined) => DateValue \| undefined` | What the calendar reads. `undefined` for anything unparseable. |
| `toNativeDate` | `(value: DateValue \| undefined) => Date \| undefined` | Back to a `Date`, at local midnight. |
| `formatDate` | `(value: Date, locale: string, options: Intl.DateTimeFormatOptions) => string` | The trigger's label, for a table that should read the same. |
