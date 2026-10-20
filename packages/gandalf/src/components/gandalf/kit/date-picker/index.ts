export { default as GKitDatePicker } from './DatePicker.vue'

export {
  formatDate,
  formatDateRange,
  isRange,
  toCalendarDate,
  toDateMatcher,
  toISODate,
  toNativeDate,
} from './date'
export { activePreset, resolvePreset } from './presets'

export type {
  DatePickerDate,
  DatePickerMatcher,
  DatePickerModelValue,
  DatePickerPreset,
  DatePickerRange,
  DatePickerSelection,
  DatePickerType,
  DatePickerWeekStart,
} from './types'
