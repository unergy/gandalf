import { cva } from 'class-variance-authority'

export { default as GHeader } from './Header.vue'

/** Figma: Header — 48px `card/card` bar with a `bni/border` bottom edge, 16px sides and 8px gaps. */
export const gandalfHeaderVariants = cva(
  'bg-card border-bni-border flex h-12 shrink-0 items-center gap-2 border-b px-4 py-3',
)

/**
 * Figma: Header › Divider — a 24×32px frame with an 8px `primary/foreground-loud` line, 16px from
 * its left edge.
 */
export const gandalfHeaderDividerClass =
  'before:bg-primary-foreground-loud relative h-8 w-6 shrink-0 before:absolute before:top-3 before:left-4 before:h-2 before:w-px'
