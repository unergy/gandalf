import { cva } from 'class-variance-authority'

export { default as GTable } from './GTable.vue'
export { default as GTableHeader } from './GTableHeader.vue'
export { default as GTableBody } from './GTableBody.vue'
export { default as GTableFooter } from './GTableFooter.vue'
export { default as GTableRow } from './GTableRow.vue'
export { default as GTableHead } from './GTableHead.vue'
export { default as GTableCell } from './GTableCell.vue'
export { default as GTableCaption } from './GTableCaption.vue'

// Figma: Table (organism). 1px `bni/border` frame, `corner/xl`, cells on `card/card`.
export const gandalfTableVariants = cva(
  'overflow-hidden rounded-xl border border-bni-border bg-card',
)

// Figma: Table → Footer. 56px bar on `base/base` under the columns ("5 de 20 row(s) displayed" + pager).
export const gandalfTableFooterBarVariants = cva(
  'flex h-14 items-center justify-end gap-2 border-t border-bni-border bg-base-base px-3 text-sm leading-[normal] text-base-foreground-quiet',
)

// Figma: Cell & Header, Type=Header. `base/base` background; the header row keeps it on hover.
export const gandalfTableHeaderVariants = cva('bg-base-base [&_tr]:hover:bg-base-base')

// <tfoot> for summary rows: same surface as the Figma footer.
export const gandalfTableFooterVariants = cva(
  'border-bni-border bg-base-base font-normal text-base-foreground-quiet',
)

// Figma: Cell & Header. Every cell has a 1px `bni/border` bottom; State=Hovered is `accent/accent`.
export const gandalfTableRowVariants = cva(
  'border-bni-border hover:bg-accent data-[state=selected]:bg-muted',
)

// Figma: Cell & Header, Type=Header. 44px, padding 12/6px, Body/xsEm in `base/foreground-extra-quiet`.
export const gandalfTableHeadVariants = cva(
  'group/table-head h-11 px-3 py-1.5 text-xs leading-[normal] font-semibold text-base-foreground-extra-quiet [&:has([role=checkbox])]:pr-3 [&>[role=checkbox]]:translate-y-0',
)

// Figma: Cell & Header, Type=Cell. 40px, padding 12/6px, Body/sm in `base/inverse`.
export const gandalfTableCellVariants = cva(
  'h-10 px-3 py-1.5 text-sm leading-[normal] text-base-inverse [&:has([role=checkbox])]:pr-3 [&>[role=checkbox]]:translate-y-0',
)

// Figma: Text Configuration=Double. Header: label 12px semibold + description 14px, 2px apart.
// Cell: label 14px + description 12px in `base/foreground-extra-quiet`, no gap.
export const gandalfTableDescriptionVariants = cva('block truncate', {
  variants: {
    type: {
      header: 'text-sm font-normal text-base-foreground-extra-quiet',
      cell: 'text-xs text-base-foreground-extra-quiet',
    },
  },
})
