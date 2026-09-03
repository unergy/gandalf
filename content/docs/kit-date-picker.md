---
title: Date Picker
description: A date field composed from the calendar, the range calendar and the popover — single days or ranges, presets that know which one is active, and plain `Date` in and out.
status: complete
---

## Preview

::kit-date-picker-preview
::

shadcn is honest about this one: there is no date picker component, there is a recipe. Every screen
writes the same forty lines — a popover, a trigger button, a formatter, an `open` flag closed by
hand — and every screen writes them slightly differently.

## What this adds over the recipe

- **The popover closes itself** and focus returns to the trigger. The recipe leaves that to a
  hand-written handler, which is where it gets forgotten.
- **A range closes when it is complete**, not on the first click — the single most common bug in a
  hand-rolled range picker.
- **The trigger label is formatted, and a range is formatted as a range**: `8/09/2026 a 14/09/2026`,
  collapsed to whatever the two ends share, with the separator the locale actually uses.
- **Presets know which of them is active**, which is the only reason a preset row is worth
  composing rather than writing inline.
- **No `@internationalized/date` in your code.** You hand it `Date`s and ISO strings; the calendar
  keeps owning the calendar dates.
- **Days survive timezones and DST.** Explained under [Formatting](#formatting).
- **`change` fires when the user picks**, never on mount and never when `v-model` is assigned from
  code.

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

**Out**: always a `Date` at local midnight. One type to read, whatever went in. An unparseable
value is read as no value: an invalid date in one field should not take a whole form down.

Going back to the wire, use `toISODate` rather than `toISOString()`, which converts to UTC before
it reads the date off. In Bogotá that is harmless for a value at local midnight, but a `Date`
carrying an evening time comes back as tomorrow — which is what `new Date()` is after 7pm.

```ts
import { toISODate } from '@/components/gandalf/kit/date-picker'

await api.post('/facturas', { fecha: toISODate(issued.value) }) // '2026-09-14'
```

## Ranges

`type="range"` swaps the calendar for the range calendar and the value for a `{ start, end }`. The
popover stays open through the middle of a selection and shuts when the second end lands.

```vue
<GKitDatePicker v-model="periodo" type="range" clearable :number-of-months="2" />
```

A range is **half picked** for as long as it takes to click the second day: the value carries a
`start` and no `end`, and the trigger prints that one day rather than falling back to the
placeholder — a picker that says "Selecciona un rango" while a start day sits highlighted is lying
about its own state. It is also why the `trigger` slot gets `empty` as a signal of its own instead
of leaving you to test `value === undefined`.

**`change` skips the half state.** A whole range and a cleared one are both selections; half of one
is the user still mid-gesture, and a caller that fetches on change would otherwise fire a request
for a range with no end. Bind `v-model` if you do want every click.

```vue
<GKitDatePicker v-model="periodo" type="range" @change="fetchReport" />
```

## Presets

A preset is a label and the value it stands for. **Give it as a function whenever it is relative to
now:**

```ts
import type { DatePickerPreset } from '@/components/gandalf/kit/date-picker'

const presets: DatePickerPreset[] = [
  { label: 'Hoy', value: () => ({ start: new Date(), end: new Date() }) },
  { label: 'Últimos 7 días', value: lastDays(7) },
]
```

A preset computed once at module scope is correct until midnight, and then quietly wrong for
everyone who left the tab open. The function is called when the row renders and again when it is
clicked, so both the highlight and the selection come from the clock as it is now.

Which brings up the part worth having: **the row knows which preset is active**, and the trigger
prints its label rather than the dates behind it. `Últimos 7 días` is what the user chose; making
them recognise it as `24/08/2026 a 31/08/2026` is asking them to do arithmetic to read their own
selection.

Identity cannot answer that question — a function hands back a fresh `Date` on every call, so `===`
is always false. `activePreset` compares the day fields instead, and is exported on its own for a
preset row that lives outside the popover.

```ts
import { activePreset } from '@/components/gandalf/kit/date-picker'
```

## The calendar keeps everything it had

Unrecognised props go to the **calendar**, not to the popover: `numberOfMonths`, `weekStartsOn`,
`fixedWeeks`, `isDateUnavailable`, `pagedNavigation`, `calendarLabel`, `layout`, all of it.

```vue
<GKitDatePicker v-model="fecha" layout="month-and-year" :max="today" />
<GKitDatePicker v-model="periodo" type="range" :number-of-months="2" fixed-weeks />
```

The popover's own surface is small on purpose, because a date picker only ever needs three knobs
from it — `open`, `align` and `contentClass` — and those are named props.

`min`, `max` and `isDateDisabled` are named too, in native `Date` terms, so that the common bounds
do not drag `@internationalized/date` into your component. Pass the calendar's own `minValue`,
`maxValue` or a `DateValue` matcher instead if you already work in those.

```vue
<GKitDatePicker v-model="due" :min="today" :is-date-disabled="isWeekend" />
```

One rename: the calendar's `placeholder` — the month on screen, a date — is this component's
**`month`**, because `placeholder` is already the trigger's empty text everywhere else in Gandalf.
Two props with one name, one a string and one a date, is a coin flip every caller loses once.

```vue
<GKitDatePicker v-model="fecha" v-model:month="mesVisible" />
```

The month is derived from the selection again each time the picker opens, so a picker whose value
changed while it was closed does not reopen on the month someone last paged to.

## Forms

`name` puts the selection in the request as a hidden input holding the ISO day. A range submits
two: `name`, and `endName` (defaulting to `${name}-end`).

```vue
<GKitDatePicker v-model="fecha" name="fecha_emision" />
<GKitDatePicker v-model="periodo" type="range" name="desde" end-name="hasta" />
```

There is no `required` prop on purpose: hidden inputs are barred from constraint validation, so it
would look like a guard and never fire. Validate the bound value instead — with Vee-validate and
Zod, like every other field on the platform.

## The pieces

`trigger` replaces the button entirely and receives `label` already formatted, so a custom trigger
does not have to re-derive it. It renders **inside** the popover trigger, so your element does not
have to know the popover exists — it just has to be a single element.

```vue
<GKitDatePicker v-model="fecha">
  <template #trigger="{ label, empty, open }">
    <GBadge class="cursor-pointer" :color="open ? 'action' : 'default'">
      {{ empty ? 'Sin fecha' : label }}
    </GBadge>
  </template>
</GKitDatePicker>
```

`footer` adds a strip below the calendar — a clear action, a hint, a time field.

```vue
<template #footer="{ clear, close }">
  <GButton variant="ghost" size="sm" @click="clear(); close()">Limpiar</GButton>
</template>
```

## Formatting

`format` is passed straight to `Intl.DateTimeFormat`, so anything it understands works:

```vue
<GKitDatePicker v-model="fecha" :format="{ dateStyle: 'full' }" />
<GKitDatePicker v-model="fecha" :format="{ day: '2-digit', month: 'long' }" />
```

Leave `timeZone` out of it. The picked day is turned into a `Date` at **local noon** and that is
what gets formatted: a calendar day means that day where the reader is, and noon is the only hour
no DST jump can delete. Midnight is not — Santiago, Havana and Beirut all spring forward at 00:00,
and on those days a picker that formats local midnight prints the wrong day.

A range is formatted with `formatRange`, not two labels joined by a dash, so it collapses whatever
the two ends share: `5–9 de enero de 2026` rather than `5 de enero de 2026 – 9 de enero de 2026`.

## Source

Lives in `gandalf/kit/` — composed from `GCalendar`, `GRangeCalendar`, `GPopover*` and `GButton` in
`gandalf/base/`. The helpers are exported alongside the component: `toISODate`, `toCalendarDate`,
`toNativeDate`, `formatDate`, `formatDateRange`, `isRange`, `activePreset`, `resolvePreset`.

## Props

Everything the wrapped calendar accepts stays available. On top of that:

::docs-props-table
---
items:
  - name: type
    type: "'single' | 'range'"
    default: "'single'"
    description: "Decides the shape of modelValue, presets and change."
  - name: modelValue
    type: "Date | string | { start, end }"
    default: "undefined"
    description: "The selection. Use with v-model. A string is read as ISO; a Date is always written back."
  - name: open
    type: boolean
    default: "false"
    description: "Popover state. Use with v-model:open."
  - name: month
    type: "Date | string"
    default: "the selection, else today"
    description: "The month on screen. Use with v-model:month. Derived from the selection on each open."
  - name: presets
    type: "DatePickerPreset[]"
    default: "undefined"
    description: "Shortcuts beside the calendar. The row highlights the active one."
  - name: placeholder
    type: string
    default: "'Select a date...'"
    description: "Trigger text while nothing is selected."
  - name: locale
    type: string
    default: "'es-CO'"
    description: "Drives the calendar's strings and the trigger label."
  - name: format
    type: "Intl.DateTimeFormatOptions"
    default: "{ dateStyle: 'medium' }"
    description: "How the trigger prints the selection."
  - name: min
    type: "Date | string"
    default: "undefined"
    description: "Earliest date that can be picked."
  - name: max
    type: "Date | string"
    default: "undefined"
    description: "Latest date that can be picked."
  - name: isDateDisabled
    type: "(date: Date) => boolean"
    default: "undefined"
    description: "Keeps individual days out of reach — weekends, holidays. Return true to disable."
  - name: clearable
    type: boolean
    default: "false"
    description: "Adds a clear control to the trigger."
  - name: clearLabel
    type: string
    default: "'Clear date'"
    description: "Accessible label for that control."
  - name: closeOnSelect
    type: boolean
    default: "true"
    description: "Whether a finished selection closes the popover. A half-picked range never does."
  - name: disabled
    type: boolean
    default: "false"
    description: "Blocks the trigger and the calendar."
  - name: name
    type: string
    default: "undefined"
    description: "Submits as a hidden input holding the ISO day."
  - name: endName
    type: string
    default: "`${name}-end`"
    description: "Field name for the end of a range."
  - name: serialize
    type: "(value: Date) => string"
    default: "toISODate"
    description: "Turns a picked day into the submitted string."
  - name: id
    type: string
    default: "undefined"
    description: "Put on the trigger, for a GLabel for."
  - name: align
    type: "'start' | 'center' | 'end'"
    default: "'start'"
    description: "Which trigger edge the popover lines up with."
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

| Slot | Props | Replaces |
|---|---|---|
| `trigger` | `value`, `label`, `empty`, `open`, `disabled`, `clear` | The whole trigger. Must render a single element. |
| `footer` | `value`, `clear`, `close` | Nothing — it is added below the calendar. |

## Events

| Event | Payload | Description |
|---|---|---|
| `update:modelValue` | `Date \| { start, end } \| undefined` | Every change, including a half-picked range. |
| `update:open` | `boolean` | The popover opened or closed. |
| `update:month` | `Date` | The month on screen changed. |
| `change` | `Date \| { start, end } \| undefined` | The user picked a day, a preset, or cleared. Never on mount, never on a programmatic set, never for half a range. |

## `DatePickerPreset`

| Field | Type | Description |
|---|---|---|
| `label` | `string` | Shown on the shortcut, and on the trigger while it is active. |
| `value` | `Value \| (() => Value)` | The selection it stands for. A function for anything relative. |

## Helpers

| Function | Description |
|---|---|
| `toISODate(value)` | The `YYYY-MM-DD` form, built from local fields. `''` for no value. |
| `toCalendarDate(value)` | What the calendar reads. `undefined` for anything unparseable. |
| `toNativeDate(value)` | Back to a `Date`, at local midnight. |
| `formatDate(value, locale, options)` | The trigger's label, for a table that should read the same. |
| `formatDateRange(range, locale, options)` | The same for a range, collapsed by `Intl.formatRange`. |
| `isRange(value)` | Whether a value is a range rather than a single day. |
| `activePreset(presets, value)` | Which preset a selection stands for, compared by day. |
| `resolvePreset(preset)` | A preset's selection as of now. |

## Deliberately absent

- **No `multiple`.** The calendar primitive has it; nothing on the platform has ever picked an
  arbitrary set of days out of a popover, and it would add a third value shape for a case nobody
  has written.
- **No time.** A date and a time are two controls — shadcn's own recipe puts an `<input type="time">`
  next to the picker rather than inside it. The `footer` slot is where that goes.
- **No natural-language parsing.** It needs a parser dependency, it is English-only out of the box,
  and it is a text input that happens to sit beside a calendar — a different component, if it is
  ever written twice.
- **No `format` string.** `Intl.DateTimeFormatOptions` is the vocabulary the platform already has,
  and a bespoke `'dd/MM/yyyy'` mini-language is a formatter Gandalf would then have to own.
