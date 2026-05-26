import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as GInput } from './GInput.vue'

export const gandalfInputVariants = cva('', {
  variants: {
    size: {
      sm: 'h-7 px-2 text-xs',
      default: '',
      lg: 'h-11 px-4 text-base',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})

export type GandalfInputVariants = VariantProps<typeof gandalfInputVariants>
export type GandalfInputSize = NonNullable<GandalfInputVariants['size']>
