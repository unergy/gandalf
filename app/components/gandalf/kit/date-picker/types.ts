/**
 * What `v-model` carries.
 *
 * A `string` is read as an ISO date (`YYYY-MM-DD`) — the shape the platform's APIs speak — so a
 * value straight off a response can be bound without converting it first. What the component
 * writes back is always a `Date`, so a caller only ever has to read one type.
 */
export type DatePickerModelValue = Date | string | undefined

/** Keeps a single day out of reach. Return `true` to disable it. */
export type DatePickerMatcher = (date: Date) => boolean

/** The first column of the week. `0` is Sunday, `1` Monday. */
export type DatePickerWeekStart = 0 | 1 | 2 | 3 | 4 | 5 | 6
