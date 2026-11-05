import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as GInput } from './GInput.vue'

// Figma: Input → Input Field. Focus and error-focus draw a 2px border as the 1px border
// plus a 1px inset ring, so the text does not shift when the field gains focus.
export const gandalfInputVariants = cva(
  [
    'rounded-lg border-bni-border-loud bg-bni-background py-0 text-base-foreground shadow-none',
    'placeholder:text-base-foreground-extra-quiet hover:bg-bni-input',
    'focus-visible:border-base-foreground-quiet focus-visible:bg-bni-input focus-visible:ring-1 focus-visible:ring-base-foreground-quiet focus-visible:ring-inset',
    'aria-invalid:border-destructive aria-invalid:focus-visible:border-destructive aria-invalid:focus-visible:ring-destructive',
    'disabled:border-muted-foreground-quiet disabled:bg-muted disabled:text-muted-foreground-quiet disabled:opacity-100 disabled:placeholder:text-muted-foreground-quiet',
  ],
  {
    variants: {
      size: {
        xs: 'h-6 px-2 text-xs md:text-xs',
        sm: 'h-8 px-2.5 text-sm md:text-sm',
        md: 'h-10 px-3 text-base md:text-base',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

export type GandalfInputVariants = VariantProps<typeof gandalfInputVariants>
export type GandalfInputSize = NonNullable<GandalfInputVariants['size']>
