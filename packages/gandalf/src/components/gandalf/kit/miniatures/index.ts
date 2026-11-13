import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as GMiniatures } from './Miniatures.vue'

// Figma: Chat → Miniatures. An attachment chip: `default` is a file (icon, name, type) and
// `variant2` an image thumbnail, the design's Type names.
export const gandalfMiniaturesVariants = cva(
  'relative flex shrink-0 items-start justify-end overflow-clip rounded-xl',
  {
    variants: {
      type: {
        default: 'border-bni-border bg-base-base h-12 w-36 gap-2 border p-1.5',
        variant2: 'bg-base-inverse size-12 p-1',
      },
    },
    defaultVariants: {
      type: 'default',
    },
  },
)

export type GandalfMiniaturesVariants = VariantProps<typeof gandalfMiniaturesVariants>
export type GandalfMiniaturesType = NonNullable<GandalfMiniaturesVariants['type']>
