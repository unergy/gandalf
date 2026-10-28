---
title: GRangeCalendar
description: An inline calendar for picking a start and an end day, with bounds, per-day availability and a live highlight between the two ends.
status: complete
---

## Preview

::range-calendar-preview
::

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { DateValue } from '@internationalized/date'
import { GRangeCalendar } from '@unergy/gandalf'

const period = ref<{ start: DateValue | undefined, end: DateValue | undefined }>()
</script>

<template>
  <GRangeCalendar v-model="period" locale="es-CO" :week-starts-on="1" :number-of-months="2" />
</template>
```

## Range Calendar or Date Picker?

`GRangeCalendar` is the **inline** range calendar: always visible, and it speaks `DateValue` — the
timezone-free date type of the underlying primitive. Most forms want a field that opens a panel and
stores plain `Date`s, which is [`GKitDatePicker`](/docs/kit-date-picker) with `type="range"`.

Use this one directly when the calendar is the page — an availability view, a booking grid — and
the picker everywhere a range is one field among others.

## The value is half written while the user picks

`modelValue` is `{ start, end }` and the primitive emits it **twice** per selection: once with a
`start` and no `end` when the first day is clicked, and again when the second lands. A caller that
fetches on every emit will fire a request for a range with no end — `update:validModelValue` fires
only for whole ranges, and `GKitDatePicker`'s `change` event is built on that same distinction.

The range only completes on a click that the calendar has **highlighted** — the primitive requires
the second day to have been hovered or focused first, which is what draws the preview between the
two ends.

## Bounds and unavailable days

`minValue` and `maxValue` grey out everything outside the range. `isDateDisabled` blocks individual
days; `isDateUnavailable` marks them struck through instead, and `allowNonContiguousRanges` decides
whether a range may span them.

```vue
<GRangeCalendar
  v-model="period"
  :min-value="today(getLocalTimeZone())"
  :is-date-unavailable="isHoliday"
  allow-non-contiguous-ranges
/>
```

`maximumDays` caps how long a range may be, and `fixedDate` pins one end so the next click only
moves the other.

## No month and year dropdowns

Unlike [`GCalendar`](/docs/calendar), there is no `layout` prop: the shadcn range calendar has no
dropdown heading to swap in. A range that reaches across years is paged, or picked in a field that
is not a calendar.

## Composing your own

The parts are exported for a layout this one does not cover.

| Component | Description |
|---|---|
| `GRangeCalendar` | The assembled range calendar. What you want in almost every case. |
| `GRangeCalendarHeader` | The row above the grid. |
| `GRangeCalendarHeading` | The month/year label. Exposes `headingValue` on its slot. |
| `GRangeCalendarPrevButton` / `GRangeCalendarNextButton` | Paging controls. The chevron is a slot. |
| `GRangeCalendarGrid` | One month's table. |
| `GRangeCalendarGridHead` / `GRangeCalendarGridBody` | Head and body of that table. |
| `GRangeCalendarGridRow` | A week. |
| `GRangeCalendarHeadCell` | A weekday label. |
| `GRangeCalendarCell` | A day cell. |
| `GRangeCalendarCellTrigger` | The button inside a day cell. |

## Source

Lives in `gandalf/base/` — a drop-in wrapper over shadcn's `RangeCalendar`. No variants of its own:
the surface is shadcn's, unchanged.

## Props

::docs-props-table
---
items:
  - name: modelValue
    type: "{ start?: DateValue, end?: DateValue }"
    default: "undefined"
    description: "The selected range. Use with v-model. Emitted half written while the user picks."
  - name: placeholder
    type: DateValue
    default: "today"
    description: "The month on display. Use with v-model:placeholder to control paging."
  - name: locale
    type: string
    default: "'en'"
    description: "Locale for month names and weekday headers. Pass 'es-CO' for Spanish."
  - name: weekStartsOn
    type: "0 | 1 | 2 | 3 | 4 | 5 | 6"
    default: "0"
    description: "First column of the week. 1 is Monday, which is how a Colombian calendar reads."
  - name: minValue
    type: DateValue
    default: "undefined"
    description: "Earliest day that can be picked."
  - name: maxValue
    type: DateValue
    default: "undefined"
    description: "Latest day that can be picked."
  - name: maximumDays
    type: number
    default: "undefined"
    description: "How many days a range may span at most."
  - name: isDateDisabled
    type: "(date: DateValue) => boolean"
    default: "undefined"
    description: "Blocks individual days. Return true to disable."
  - name: isDateUnavailable
    type: "(date: DateValue) => boolean"
    default: "undefined"
    description: "Marks days as unavailable — struck through rather than greyed out."
  - name: allowNonContiguousRanges
    type: boolean
    default: "false"
    description: "Whether a range may span unavailable days."
  - name: fixedDate
    type: "'start' | 'end'"
    default: "undefined"
    description: "Pins one end of the range so the next click only moves the other."
  - name: numberOfMonths
    type: number
    default: "1"
    description: "How many months are shown side by side."
  - name: pagedNavigation
    type: boolean
    default: "false"
    description: "Pages by the number of months shown rather than one at a time."
  - name: fixedWeeks
    type: boolean
    default: "false"
    description: "Always renders six weeks, so the grid does not change height between months."
  - name: preventDeselect
    type: boolean
    default: "false"
    description: "Stops the user clearing a range without picking another."
  - name: initialFocus
    type: boolean
    default: "false"
    description: "Focuses the selected day, or today, when the calendar mounts."
  - name: disabled
    type: boolean
    default: "false"
    description: "Blocks the whole calendar."
  - name: readonly
    type: boolean
    default: "false"
    description: "Shows the selection but does not allow changing it."
  - name: class
    type: string
    default: "undefined"
    description: "Merged onto the calendar root."
---
::

## Events

| Event | Payload | Description |
|---|---|---|
| `update:modelValue` | `{ start, end }` | Every change, including the half-written range. |
| `update:validModelValue` | `{ start, end }` | Only whole ranges. |
| `update:startValue` | `DateValue \| undefined` | The start end changed. |
| `update:placeholder` | `DateValue` | The month on display changed. |
