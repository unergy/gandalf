import { cva } from 'class-variance-authority'

export { default as GStar } from './Star.vue'

// Figma: Check → Star. Outline in base-foreground-extra-quiet; activated, filled #FDC700 (yellow-400).
export const gandalfStarVariants = cva(
  'inline-flex shrink-0 cursor-pointer items-center justify-center rounded-sm text-base-foreground-extra-quiet outline-none hover:text-base-foreground-quiet focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=on]:text-yellow-400 [&_svg]:size-full data-[state=on]:[&_svg]:fill-current',
  {
    variants: {
      size: {
        md: 'size-4',
        sm: 'size-3.5',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)
