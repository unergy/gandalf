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

/**
 * Menu Check Item: an item of a multiple-choice list. The square check is drawn on ::after (not in
 * the item text, which selects copy into their trigger); hover and keyboard highlight preview the
 * next state. Checked items get the accent fill and border.
 */
export const gandalfMenuCheckItemVariants = cva([
  'relative border border-transparent pr-8',
  "after:absolute after:top-1/2 after:right-2 after:size-4 after:-translate-y-1/2 after:bg-current after:content-[''] after:text-base-foreground-extra-quiet after:check-glyph-square",
  'hover:after:text-base-foreground-quiet hover:after:check-glyph-square-checked data-[highlighted]:after:text-base-foreground-quiet data-[highlighted]:after:check-glyph-square-checked',
  'data-[state=checked]:border-accent-primary-foreground data-[state=checked]:bg-accent-primary data-[state=checked]:text-accent-primary-foreground data-[state=checked]:after:text-accent-primary-foreground data-[state=checked]:after:check-glyph-square-checked',
  'data-[state=checked]:hover:after:check-glyph-square data-[state=checked]:data-[highlighted]:after:check-glyph-square',
    'data-[state=checked]:focus:bg-accent-primary data-[state=checked]:data-[highlighted]:bg-accent-primary data-[state=checked]:focus:text-accent-primary-foreground data-[state=checked]:data-[highlighted]:text-accent-primary-foreground',
  'data-[disabled]:after:text-muted-foreground-quiet data-[disabled]:data-[state=checked]:border-muted-foreground-quiet data-[disabled]:data-[state=checked]:bg-muted data-[disabled]:data-[state=checked]:text-muted-foreground-quiet',
])
