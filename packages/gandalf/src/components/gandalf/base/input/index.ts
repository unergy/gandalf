import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as GInput } from './GInput.vue'

// Same heights as GSelectTrigger, so inputs and selects line up in a form row.
export const gandalfInputVariants = cva('', {
  variants: {
    size: {
      sm: 'h-8',
      default: 'h-9',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})

export type GandalfInputVariants = VariantProps<typeof gandalfInputVariants>
export type GandalfInputSize = NonNullable<GandalfInputVariants['size']>
