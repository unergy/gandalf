import type { DateValue } from '@internationalized/date'
import type { DatePickerMatcher } from './types'
import { CalendarDate, getLocalTimeZone, parseDate } from '@internationalized/date'

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/

/**
 * Reads whatever the caller put in `v-model` as a calendar date — a day, with no time and no
 * timezone, which is what a date on a form actually is.
 *
 * A string is parsed with `parseDate` rather than `new Date(value)`. The built-in parser reads a
 * bare `'2026-09-03'` as UTC midnight, which in Bogotá (UTC-5) is the evening of the 2nd: the
 * picker would highlight the day before the one the API sent. `parseDate` has no timezone at all.
 *
 * A `Date` is read through its local fields, because the day the user picked is the day they saw
 * on their own screen, not the one the same instant lands on in UTC.
 *
 * Anything unparseable comes back as `undefined` — an invalid date is the same as no date here,
 * and throwing would take a whole form down over one bad field.
 */
export function toCalendarDate(value: Date | string | undefined | null): DateValue | undefined {
  if (value === undefined || value === null) return undefined

  if (typeof value === 'string') {
    // A full ISO timestamp is accepted by taking its date part, which is what the server wrote.
    const day = value.slice(0, 10)
    if (!ISO_DATE.test(day)) return undefined
    try {
      return parseDate(day)
    } catch {
      return undefined
    }
  }

  if (Number.isNaN(value.getTime())) return undefined
  return new CalendarDate(value.getFullYear(), value.getMonth() + 1, value.getDate())
}

/** A calendar date back as a native `Date`, at local midnight. */
export function toNativeDate(value: DateValue): Date
export function toNativeDate(value: DateValue | undefined): Date | undefined
export function toNativeDate(value: DateValue | undefined): Date | undefined {
  return value?.toDate(getLocalTimeZone())
}

/**
 * The `YYYY-MM-DD` form, for the wire.
 *
 * Built from the calendar fields rather than `toISOString()`, which converts to UTC first and so
 * reports the previous day for any local midnight west of Greenwich — every date the platform
 * handles.
 */
export function toISODate(value: Date | string | undefined | null): string {
  const date = toCalendarDate(value)
  if (!date) return ''
  const month = String(date.month).padStart(2, '0')
  const day = String(date.day).padStart(2, '0')
  return `${String(date.year).padStart(4, '0')}-${month}-${day}`
}

/** How a picked date reads on the trigger. Exported so a table can show the same string. */
export function formatDate(
  value: Date,
  locale: string,
  options: Intl.DateTimeFormatOptions,
): string {
  return new Intl.DateTimeFormat(locale, options).format(value)
}

/** Lifts a matcher written in native `Date` terms into the one the calendar primitive expects. */
export function toDateMatcher(
  matcher: DatePickerMatcher | undefined,
): ((date: DateValue) => boolean) | undefined {
  return matcher ? (date: DateValue) => matcher(toNativeDate(date)) : undefined
}
