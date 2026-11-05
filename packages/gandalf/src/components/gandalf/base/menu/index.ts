import { cva } from 'class-variance-authority'

// Figma: Menu. Shared by every list that opens from a trigger (GDropdown, GSelect, GCombobox), so
// all of them look the same. Selectors repeat shadcn's own variant strings verbatim so that
// tailwind-merge replaces them instead of keeping both.

/** Dropdown menu: the floating container. Padding is completed by the list's own viewport. */
export const gandalfMenuContentVariants = cva(
  'rounded-xl border border-bni-border-loud bg-card text-base-foreground shadow-sm',
)

/** Menu Item: 36px rows, 16px text, Figma's alpha overlays for hover and press. */
export const gandalfMenuItemVariants = cva(
  "mb-1 min-h-9 gap-2 rounded-lg text-base text-base-foreground last:mb-0 hover:overlay-dark-8 focus:bg-transparent focus:text-base-foreground focus:overlay-dark-8 active:overlay-dark-12 data-[highlighted]:bg-transparent data-[highlighted]:text-base-foreground data-[highlighted]:overlay-dark-8 data-[disabled]:bg-muted data-[disabled]:text-muted-foreground-quiet data-[disabled]:opacity-100 [&_svg:not([class*='text-'])]:text-base-foreground [&_svg:not([class*='size-'])]:size-4 data-[disabled]:[&_svg:not([class*='text-'])]:text-muted-foreground-quiet",
)

/** Divider, Type=Header: a group title. */
export const gandalfMenuLabelVariants = cva(
  'flex h-9 items-center gap-2 px-3 py-0 text-sm font-normal text-base-foreground-extra-quiet',
)

/** Divider, Type=Line. */
export const gandalfMenuSeparatorVariants = cva('mx-3 my-4 h-px bg-border')
