import type { DateValue } from '@internationalized/date'
import type { DatePickerDate, DatePickerMatcher, DatePickerRange } from './types'
import { CalendarDate, getLocalTimeZone, parseDate } from '@internationalized/date'

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/

/** Whether a model value is a range rather than a single day. */
export function isRange(value: unknown): value is DatePickerRange {
  return (
    typeof value === 'object' &&
    value !== null &&
    !(value instanceof Date) &&
    ('start' in value || 'end' in value)
  )
}

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
export function toCalendarDate(value: DatePickerDate | undefined | null): DateValue | undefined {
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
 * Built from the calendar fields rather than `toISOString()`, which converts to UTC before it
 * reads the date off. In Bogotá (UTC-5) that is harmless for a value at local midnight, but a
 * `Date` carrying an evening time reports tomorrow — `new Date()` after 7pm is exactly that — and
 * east of Greenwich it is a day early even at midnight. The day someone picked should not depend
 * on the hour they picked it.
 */
export function toISODate(value: DatePickerDate | undefined | null): string {
  const date = toCalendarDate(value)
  if (!date) return ''
  const month = String(date.month).padStart(2, '0')
  const day = String(date.day).padStart(2, '0')
  return `${String(date.year).padStart(4, '0')}-${month}-${day}`
}

/**
 * A day as the instant `Intl` should be handed, which is local **noon**.
 *
 * Not midnight: midnight is the one hour a DST jump can delete. Where a timezone springs forward
 * at 00:00 — Santiago, Havana and Beirut all do — that day has no midnight, the conversion lands
 * on a neighbouring instant, and the trigger prints a day the user did not pick. No jump has ever
 * moved noon.
 */
function atNoon(value: DateValue): Date {
  return new Date(value.year, value.month - 1, value.day, 12)
}

/** How a picked day reads. Exported so a table can show the same string as the trigger. */
export function formatDate(
  value: DatePickerDate | undefined | null,
  locale: string,
  options: Intl.DateTimeFormatOptions,
): string {
  const date = toCalendarDate(value)
  return date ? new Intl.DateTimeFormat(locale, options).format(atNoon(date)) : ''
}

/**
 * How a picked range reads.
 *
 * `formatRange` rather than two `format` calls joined by a dash: it collapses whatever the two
 * ends share, so a range inside one month reads `5–9 de enero de 2026` and not
 * `5 de enero de 2026 – 9 de enero de 2026`, with the separator each locale actually uses.
 */
export function formatDateRange(
  range: DatePickerRange | undefined | null,
  locale: string,
  options: Intl.DateTimeFormatOptions,
): string {
  const start = toCalendarDate(range?.start)
  const end = toCalendarDate(range?.end)
  if (!start) return ''
  // A half-picked range prints the day that is already chosen. Falling back to the placeholder
  // while a start day sits highlighted would have the trigger lie about the picker's own state.
  if (!end) return formatDate(range?.start, locale, options)
  return new Intl.DateTimeFormat(locale, options).formatRange(atNoon(start), atNoon(end))
}

/** Lifts a matcher written in native `Date` terms into the one the calendar primitive expects. */
export function toDateMatcher(
  matcher: DatePickerMatcher | undefined,
): ((date: DateValue) => boolean) | undefined {
  return matcher ? (date: DateValue) => matcher(toNativeDate(date)) : undefined
}
