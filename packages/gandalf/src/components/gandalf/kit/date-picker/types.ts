/**
 * A day, in the shapes a caller is likely to already have one in.
 *
 * A `string` is read as an ISO date (`YYYY-MM-DD`) — the shape the platform's APIs speak — so a
 * value straight off a response can be bound without converting it first. What the picker writes
 * back is always a `Date`, so a caller only ever has to read one type.
 */
export type DatePickerDate = Date | string

/** A range. `end` is missing for as long as it takes the user to click the second day. */
export type DatePickerRange = {
  start?: DatePickerDate
  end?: DatePickerDate
}

/** What `v-model` carries: a day for `type="single"`, a range for `type="range"`. */
export type DatePickerModelValue = DatePickerDate | DatePickerRange | undefined

/** What the picker writes back: the same two shapes, narrowed to `Date`. */
export type DatePickerSelection = Date | { start?: Date; end?: Date } | undefined

/** Whether `value` is a day or a range. */
export type DatePickerType = 'single' | 'range'

/** Keeps a single day out of reach. Return `true` to disable it. */
export type DatePickerMatcher = (date: Date) => boolean

/** The first column of the week. `0` is Sunday, `1` Monday. */
export type DatePickerWeekStart = 0 | 1 | 2 | 3 | 4 | 5 | 6

/**
 * A shortcut beside the calendar.
 *
 * Give `value` as a function whenever it is relative to now. A preset computed once at module
 * scope is right until midnight and then quietly wrong for everyone who left the tab open; the
 * function is called when the row renders and again when it is clicked, so both the highlight and
 * the selection come from the clock as it is.
 */
export type DatePickerPreset = {
  /** Shown on the shortcut, and on the trigger while it is the active selection. */
  label: string
  /** The selection it stands for. */
  value: DatePickerModelValue | (() => DatePickerModelValue)
}
