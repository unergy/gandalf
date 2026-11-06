import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as GButton } from './GButton.vue'

// Figma: Button. Variant values are the design's Type names; `type` itself is taken by the native
// <button> attribute. Each variant also sets its hover background so shadcn's own hover does not
// leak through; hover and press tint with Figma's alpha overlays instead.
export const gandalfButtonVariants = cva(
  'relative rounded-lg font-semibold leading-[normal] disabled:opacity-100',
  {
    variants: {
      variant: {
        'tonal-primary':
          'bg-primary text-primary-foreground hover:bg-primary hover:overlay-light-8 active:overlay-light-12',
        'tonal-action':
          'bg-action text-white hover:bg-action hover:overlay-light-8 active:overlay-light-12',
        'tonal-destructive':
          'bg-destructive text-white hover:bg-destructive hover:overlay-light-8 active:overlay-light-12',
        'outline-primary':
          'border border-primary-foreground-loud bg-card text-primary hover:bg-card hover:overlay-dark-8 active:overlay-dark-12',
        'outline-destructive':
          'border border-bni-border-loud bg-card text-destructive hover:bg-card hover:overlay-dark-8 active:overlay-dark-12',
        'ghost-primary':
          'bg-transparent text-primary hover:bg-transparent hover:overlay-dark-8 active:overlay-dark-12',
        'ghost-action':
          'bg-transparent text-action-bold hover:bg-transparent hover:overlay-dark-8 active:overlay-dark-12',
        'ghost-danger':
          'bg-transparent text-destructive-bold hover:bg-transparent hover:overlay-dark-8 active:overlay-dark-12',
      },
      size: {
        md: 'h-10 min-w-10 gap-3 px-3 text-base has-[>svg]:px-3',
        sm: 'h-9 min-w-9 gap-2 px-2 text-sm has-[>svg]:px-2',
        xs: 'h-8 min-w-8 gap-2 px-2 text-sm has-[>svg]:px-2',
      },
    },
    compoundVariants: [
      {
        variant: ['tonal-primary', 'tonal-action', 'tonal-destructive'],
        class: 'disabled:bg-muted disabled:text-muted-foreground-quiet',
      },
      {
        variant: ['outline-primary', 'outline-destructive'],
        class:
          'disabled:border-muted-foreground-quiet disabled:bg-transparent disabled:text-muted-foreground-quiet',
      },
      {
        variant: ['ghost-primary', 'ghost-action', 'ghost-danger'],
        class: 'disabled:text-muted-foreground-quiet',
      },
    ],
    defaultVariants: {
      variant: 'tonal-primary',
      size: 'md',
    },
  },
)

export type GandalfButtonVariants = VariantProps<typeof gandalfButtonVariants>
export type GandalfButtonVariant = NonNullable<GandalfButtonVariants['variant']>
export type GandalfButtonSize = NonNullable<GandalfButtonVariants['size']>
