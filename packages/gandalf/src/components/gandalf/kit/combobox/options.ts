import type { ComboboxOption, ComboboxOptionGroup, ComboboxOptions } from './types'
import { fold } from './fold'

/**
 * Whether an entry is a group rather than an option.
 *
 * Groups are told apart by carrying `options`, so an option may not have a property by that name.
 * The alternative — a `kind` discriminator — would have to be written on every option by hand,
 * which is a tax on the common case to make the rare one tidier.
 */
export function isGroup(entry: ComboboxOption | ComboboxOptionGroup): entry is ComboboxOptionGroup {
  return entry !== null && typeof entry === 'object' && 'options' in entry
}

/**
 * Reads either shape as groups, so the rest of the component only handles one.
 *
 * A flat list becomes a single unlabelled group. The first entry decides how the whole array is
 * read: a mixed array is a caller mistake, and guessing per entry would hide it.
 */
export function toGroups(options: ComboboxOptions): ComboboxOptionGroup[] {
  const first = options[0]
  if (first === undefined) return []
  return isGroup(first)
    ? (options as ComboboxOptionGroup[])
    : [{ options: options as ComboboxOption[] }]
}

/** Every option, in order, with the grouping discarded. */
export function flatten(options: ComboboxOptions): ComboboxOption[] {
  return toGroups(options).flatMap((group) => group.options)
}

/** The strings an option can be found by: what is shown, plus anything it was tagged with. */
export function terms(option: ComboboxOption): string[] {
  return [option.label, option.description, ...(option.keywords ?? [])].filter(
    (term): term is string => typeof term === 'string' && term.length > 0,
  )
}

/**
 * The default matcher: does this option answer this search?
 *
 * Folded on both sides, so `bogota` finds `Bogotá`. An empty search matches everything, which is
 * what makes the list appear in full before anyone types.
 */
export function matches(option: ComboboxOption, search: string): boolean {
  const needle = fold(search.trim())
  if (needle === '') return true
  return terms(option).some((term) => fold(term).includes(needle))
}
