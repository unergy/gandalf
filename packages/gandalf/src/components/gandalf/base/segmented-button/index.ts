import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as GSegmentedButton } from './GSegmentedButton.vue'
export { default as GSegment } from './GSegment.vue'

// Figma: Segmented Button (molecule). A pill-shaped container that clips its segments; the
// 1px dividers of the design are the left border of every segment but the first (see GSegment).
export const gandalfSegmentedButtonVariants = cva(
  'w-fit overflow-hidden rounded-full border border-bni-border-extra-loud bg-card',
)

// Figma: Segment (atom). Only declares what differs from the shadcn Toggle base, which already
// provides the layout, the 16px icon sizing and the focus ring. Hover and press tint with Figma's
// alpha overlays; the `data-[state=on]:hover:` pairs outrank shadcn's own `hover:` rules so the
// activated segment keeps its purple while hovered.
export const gandalfSegmentVariants = cva(
  [
    'text-base-foreground h-10 min-w-0 cursor-pointer rounded-none px-3 text-base leading-[normal] font-semibold',
    'border-bni-border-extra-loud border-l first:border-l-0',
    // Type=Two draws its single divider in primary/foreground-loud; Three to Six keep bni/border-extra-loud.
    '[&:nth-child(2):last-child]:border-l-primary-foreground-loud',
    'data-[spacing=0]:rounded-none data-[spacing=0]:first:rounded-l-none data-[spacing=0]:last:rounded-r-none',
    'hover:text-base-foreground hover:overlay-dark-5 active:overlay-dark-8 hover:bg-transparent',
    'data-[state=on]:bg-accent-primary data-[state=on]:text-accent-primary-foreground',
    'data-[state=on]:hover:bg-accent-primary data-[state=on]:hover:text-accent-primary-foreground',
    'focus-visible:border-bni-border-extra-loud focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-inset',
    'disabled:bg-muted disabled:text-muted-foreground-quiet disabled:opacity-100',
  ].join(' '),
)

export type GandalfSegmentedButtonVariants = VariantProps<typeof gandalfSegmentedButtonVariants>
export type GandalfSegmentVariants = VariantProps<typeof gandalfSegmentVariants>
