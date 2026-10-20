import type { SelectOption, SelectOptionGroup, SelectOptions } from './types'

/**
 * Whether an entry is a group rather than an option.
 *
 * Groups are told apart by carrying `options`, so an option may not have a property by that name.
 * The alternative — a `kind` discriminator — would have to be written on every option by hand,
 * which is a tax on the common case to make the rare one tidier.
 */
export function isGroup(entry: SelectOption | SelectOptionGroup): entry is SelectOptionGroup {
  return entry !== null && typeof entry === 'object' && 'options' in entry
}

/**
 * Reads either shape as groups, so the rest of the component only handles one.
 *
 * A flat list becomes a single unlabelled group. The first entry decides how the whole array is
 * read: a mixed array is a caller mistake, and guessing per entry would hide it.
 */
export function toGroups(options: SelectOptions): SelectOptionGroup[] {
  const first = options[0]
  if (first === undefined) return []
  return isGroup(first)
    ? (options as SelectOptionGroup[])
    : [{ options: options as SelectOption[] }]
}

/** Every option, in order, with the grouping discarded. */
export function flatten(options: SelectOptions): SelectOption[] {
  return toGroups(options).flatMap((group) => group.options)
}
