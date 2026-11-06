import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as GScrollArea } from './GScrollArea.vue'
export { default as GScrollBar } from './GScrollBar.vue'

// Figma: Scrollbar → Container Scroll Bar (Type=Vertical/Horizontal). A 6px track in
// base/base-loud with corner/sm, and a base/foreground-quiet thumb with the same radius. 8px of air
// outside the track (margin) and 8px inside it (padding), which Reka counts when it sizes the thumb.
export const gandalfScrollBarVariants = cva(
  'rounded-sm bg-base-loud p-0 [&_[data-slot=scroll-area-thumb]]:rounded-sm [&_[data-slot=scroll-area-thumb]]:bg-base-foreground-quiet',
  {
    variants: {
      orientation: {
        vertical: 'my-2 h-auto w-1.5 border-l-0 py-2',
        horizontal: 'mx-2 h-1.5 border-t-0 px-2',
      },
    },
    defaultVariants: {
      orientation: 'vertical',
    },
  },
)

// Figma does not draw the container. It keeps shadcn's `relative` and repaints the vertical bar that
// ui/scroll-area mounts by itself (it takes no class) with the values of gandalfScrollBarVariants.
export const gandalfScrollAreaVariants = cva(
  [
    'relative',
    '[&>[data-slot=scroll-area-scrollbar]]:my-2',
    '[&>[data-slot=scroll-area-scrollbar]]:h-auto',
    '[&>[data-slot=scroll-area-scrollbar]]:w-1.5',
    '[&>[data-slot=scroll-area-scrollbar]]:rounded-sm',
    '[&>[data-slot=scroll-area-scrollbar]]:border-l-0',
    '[&>[data-slot=scroll-area-scrollbar]]:bg-base-loud',
    '[&>[data-slot=scroll-area-scrollbar]]:px-0',
    '[&>[data-slot=scroll-area-scrollbar]]:py-2',
    '[&>[data-slot=scroll-area-scrollbar]_[data-slot=scroll-area-thumb]]:rounded-sm',
    '[&>[data-slot=scroll-area-scrollbar]_[data-slot=scroll-area-thumb]]:bg-base-foreground-quiet',
  ],
  {
    variants: {
      orientation: {
        vertical: '',
        horizontal: '[&>[data-slot=scroll-area-scrollbar]]:hidden',
        both: '',
      },
    },
    defaultVariants: {
      orientation: 'vertical',
    },
  },
)

export type GandalfScrollBarVariants = VariantProps<typeof gandalfScrollBarVariants>
export type GandalfScrollAreaVariants = VariantProps<typeof gandalfScrollAreaVariants>
export type GandalfScrollAreaOrientation = NonNullable<GandalfScrollAreaVariants['orientation']>
