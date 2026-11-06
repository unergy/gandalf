import type { DatePickerModelValue, DatePickerPreset } from './types'
import { isRange, toISODate } from './date'

/** A preset's selection as of now. */
export function resolvePreset(preset: DatePickerPreset): DatePickerModelValue {
  return typeof preset.value === 'function' ? preset.value() : preset.value
}

/** The day fields of a selection, and nothing else — what two selections are compared by. */
function key(value: DatePickerModelValue): string {
  if (value === undefined || value === null) return ''
  if (isRange(value)) {
    const start = toISODate(value.start)
    const end = toISODate(value.end)
    return start || end ? `${start}/${end}` : ''
  }
  return toISODate(value)
}

/**
 * Which preset the current selection stands for, if any.
 *
 * Compared by day rather than by identity: a preset given as a function hands back a fresh date on
 * every call, so `===` is always false and the row would never highlight. Exported on its own for
 * a preset row rendered outside the picker.
 */
export function activePreset(
  presets: DatePickerPreset[],
  value: DatePickerModelValue,
): DatePickerPreset | undefined {
  const target = key(value)
  if (target === '') return undefined
  return presets.find((preset) => key(resolvePreset(preset)) === target)
}
