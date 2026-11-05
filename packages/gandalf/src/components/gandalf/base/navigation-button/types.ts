export type NavigationOption = {
  label: string
  value: string | number
  description?: string
  disabled?: boolean
}

/** Options shown together; groups are separated by a line. */
export type NavigationOptionGroup = {
  options: NavigationOption[]
}

export type NavigationOptions = NavigationOption[] | NavigationOptionGroup[]
