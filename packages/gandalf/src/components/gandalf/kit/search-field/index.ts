import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as GSearchField } from './SearchField.vue'

// Figma: Input → Search Field. Unlike Input Field, the sm size uses 12px text.
export const gandalfSearchFieldVariants = cva('flex w-full items-center', {
  variants: {
    size: {
      xs: 'h-6 gap-1.5 px-2 text-xs [&_svg]:size-3',
      sm: 'h-8 gap-2 px-3 text-xs [&_svg]:size-3.5',
      md: 'h-10 gap-2 px-3 text-base [&_svg]:size-4',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export type GandalfSearchFieldVariants = VariantProps<typeof gandalfSearchFieldVariants>
export type GandalfSearchFieldSize = NonNullable<GandalfSearchFieldVariants['size']>
