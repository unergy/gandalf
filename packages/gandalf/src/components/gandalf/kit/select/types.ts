import type { Option } from '@/components/gandalf/base/types'

/**
 * An option, plus a second line.
 *
 * No `keywords` here, unlike the combobox: a select has no search box, so a term that matches
 * without being shown could never be typed. If the list is long enough to want searching, that
 * is the signal to reach for `GKitCombobox` instead.
 */
export type SelectOption = Option & {
  /** Second line under the label, in the list only. The trigger shows the label alone. */
  description?: string
}

/** A labelled run of options, rendered under a heading. */
export type SelectOptionGroup = {
  label?: string
  options: SelectOption[]
}

/**
 * Either a flat list or a grouped one. Do not mix the two in a single array — the first entry
 * decides how the whole array is read.
 */
export type SelectOptions = SelectOption[] | SelectOptionGroup[]

/** The value of a single option. */
export type SelectValue = Option['value']

/** What `v-model` carries: one value, or an array of them when `multiple` is set. */
export type SelectModelValue = SelectValue | SelectValue[] | undefined
