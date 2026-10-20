---
title: GCalendar
description: An inline calendar for picking a day, with locale-aware headings, bounds and per-day availability.
status: complete
---

## Preview

::calendar-preview
::

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { DateValue } from '@internationalized/date'
import { GCalendar } from '@/components/gandalf/base/calendar'

const day = ref<DateValue>()
</script>

<template>
  <GCalendar v-model="day" locale="es-CO" :week-starts-on="1" />
</template>
```

## Calendar or Date Picker?

`GCalendar` is the **inline** calendar: it is always visible and speaks `DateValue`, the
timezone-free date type of the underlying primitive. Most forms do not want that — they want a
field that opens a panel and stores a plain `Date`. That is [`GKitDatePicker`](/docs/kit-date-picker),
which composes this calendar with a popover and does the conversion for you.

Use `GCalendar` directly when the calendar is the page — a booking grid, an availability view —
and `GKitDatePicker` everywhere a date is one field among others.

## `DateValue`, not `Date`

The primitive works in `DateValue` (`CalendarDate` and friends from `@internationalized/date`): a
day with no time and no timezone, which is what a date on a calendar actually is. Converting a
`Date` by hand is a trap — `new Date('2026-09-03')` parses as UTC midnight, which is the evening
of the 2nd in Bogotá.

```ts
import { parseDate, today, getLocalTimeZone } from '@internationalized/date'

const fromApi = parseDate('2026-09-03') // never new Date('2026-09-03')
const now = today(getLocalTimeZone())
const back = fromApi.toDate(getLocalTimeZone()) // → Date, at local midnight
```

`GKitDatePicker` exports `toCalendarDate`, `toNativeDate` and `toISODate` if you want the same
conversions without the picker.

## Bounds and unavailable days

`minValue` and `maxValue` grey out everything outside the range. `isDateDisabled` blocks
individual days — weekends, holidays — and `isDateUnavailable` marks them struck through instead,
for days that exist but cannot be booked.

```vue
<GCalendar
  v-model="day"
  :min-value="today(getLocalTimeZone())"
  :is-date-disabled="(date) => date.toDate(getLocalTimeZone()).getDay() === 0"
/>
```

## Month and year dropdowns

`layout` swaps the static heading for select controls. Use it for anything that reaches far from
the current month — a birthdate is the usual case, where paging one month at a time is unusable.

```vue
<GCalendar v-model="birthday" layout="month-and-year" />
```

`yearRange` sets the years the dropdown offers. It defaults to 100 years back and 10 forward.

## Several months at once

```vue
<GCalendar v-model="day" :number-of-months="2" paged-navigation />
```

## Composing your own

`GCalendar` is the assembled calendar. The parts it is built from are exported too, for a layout
this one does not cover — a different header, an extra column, day cells that render content.

```vue
<GCalendarHeader>
  <GCalendarPrevButton />
  <GCalendarHeading />
  <GCalendarNextButton />
</GCalendarHeader>
```

| Component | Description |
|---|---|
| `GCalendar` | The assembled calendar. What you want in almost every case. |
| `GCalendarHeader` | The row above the grid. |
| `GCalendarHeading` | The month/year label. Exposes `headingValue` on its slot. |
| `GCalendarPrevButton` / `GCalendarNextButton` | Paging controls. The chevron is a slot. |
| `GCalendarGrid` | One month's table. |
| `GCalendarGridHead` / `GCalendarGridBody` | Head and body of that table. |
| `GCalendarGridRow` | A week. |
| `GCalendarHeadCell` | A weekday label. |
| `GCalendarCell` | A day cell. |
| `GCalendarCellTrigger` | The button inside a day cell. |

## Source

Lives in `gandalf/base/` — a drop-in wrapper over shadcn's `Calendar`. No variants of its own: the
surface is shadcn's, unchanged. `GandalfCalendarLayout` is re-exported from the barrel so `kit/`
components can type against `layout` without importing from `ui/`.

## Props

::docs-props-table
---
items:
  - name: modelValue
    type: "DateValue | DateValue[] | undefined"
    default: "undefined"
    description: "The selected day. Use with `v-model`. An array when `multiple` is set."
  - name: placeholder
    type: DateValue
    default: "today"
    description: "The month on display. Use with `v-model:placeholder` to control paging."
  - name: defaultPlaceholder
    type: DateValue
    default: "today"
    description: "The month to open on, for when paging does not need to be controlled."
  - name: locale
    type: string
    default: "'en'"
    description: "Locale for month names and weekday headers. Pass 'es-CO' for Spanish."
  - name: weekStartsOn
    type: "0 | 1 | 2 | 3 | 4 | 5 | 6"
    default: "0"
    description: "First column of the week. 1 is Monday, which is how a Colombian calendar reads."
  - name: weekdayFormat
    type: "'narrow' | 'short' | 'long'"
    default: "'narrow'"
    description: "How the weekday headers are written."
  - name: minValue
    type: DateValue
    default: "undefined"
    description: "Earliest day that can be picked."
  - name: maxValue
    type: DateValue
    default: "undefined"
    description: "Latest day that can be picked."
  - name: isDateDisabled
    type: "(date: DateValue) => boolean"
    default: "undefined"
    description: "Blocks individual days. Return true to disable."
  - name: isDateUnavailable
    type: "(date: DateValue) => boolean"
    default: "undefined"
    description: "Marks days as unavailable — struck through rather than greyed out."
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
  - name: multiple
    type: boolean
    default: "false"
    description: "Allows picking several days. `modelValue` becomes an array."
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
  - name: layout
    type: "'month-and-year' | 'month-only' | 'year-only'"
    default: "undefined"
    description: "Swaps the static heading for month and/or year dropdowns."
  - name: yearRange
    type: "DateValue[]"
    default: "100 back, 10 forward"
    description: "The years the year dropdown offers."
  - name: class
    type: string
    default: "undefined"
    description: "Merged onto the calendar root."
---
::

## Slots

| Slot | Props | Description |
|---|---|---|
| `calendar-heading` | `date`, `month`, `year` | Replaces the header label. `month` and `year` are the dropdown templates. |
| `calendar-prev-icon` | — | Replaces the previous-month chevron. |
| `calendar-next-icon` | — | Replaces the next-month chevron. |

## Events

| Event | Payload | Description |
|---|---|---|
| `update:modelValue` | `DateValue \| undefined` | Emitted when the selection changes. `undefined` when the picked day is clicked again. |
| `update:placeholder` | `DateValue` | Emitted when the month on display changes. |
