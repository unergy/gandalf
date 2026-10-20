import type { Option } from '@/components/gandalf/base/types'

/**
 * An option, plus the two fields only a searchable list needs.
 *
 * Built on the shared `Option` rather than a generic `T`: `value` stays `string | number`, which
 * is what Reka accepts as an item value and what every other Gandalf component already speaks.
 * A generic value type would push a `by` comparator onto every caller to buy a case the platform
 * does not have.
 */
export type ComboboxOption = Option & {
  /** Second line under the label. Searched along with it. */
  description?: string
  /** Extra terms that match this option without being shown — synonyms, codes, an old name. */
  keywords?: string[]
}

/** A labelled run of options, rendered under a heading. */
export type ComboboxOptionGroup = {
  label?: string
  options: ComboboxOption[]
}

/**
 * Either a flat list or a grouped one. Do not mix the two in a single array — the first entry
 * decides how the whole array is read.
 */
export type ComboboxOptions = ComboboxOption[] | ComboboxOptionGroup[]

/** The value of a single option. */
export type ComboboxValue = Option['value']

/** What `v-model` carries: one value, or an array of them when `multiple` is set. */
export type ComboboxModelValue = ComboboxValue | ComboboxValue[] | undefined

/** Keeps an option out of the list. Return `true` to keep it. */
export type ComboboxFilter = (option: ComboboxOption, search: string) => boolean
