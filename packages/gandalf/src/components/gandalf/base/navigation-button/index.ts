import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as GNavigationButton } from './GNavigationButton.vue'
export type { NavigationOption, NavigationOptionGroup, NavigationOptions } from './types'

// Figma: Button → Navegation Buttons. The trigger shows the current level and opens a menu of
// levels; `color` tints the trigger text, as the "Rol" example in the design.
export const gandalfNavigationButtonVariants = cva(
  'flex min-h-[57px] w-full cursor-pointer items-center justify-between gap-2 rounded-xl border border-bni-border-loud bg-card px-3 py-1.5 text-left outline-none hover:overlay-dark-5 focus-visible:ring-2 focus-visible:ring-ring active:overlay-dark-8 data-[state=open]:overlay-dark-8 disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      color: {
        default: 'text-base-foreground',
        action: 'text-action-bold',
        information: 'text-information-bold',
        success: 'text-success-bold',
        warning: 'text-warning-bold',
        destructive: 'text-destructive-bold',
      },
    },
    defaultVariants: {
      color: 'default',
    },
  },
)

export type GandalfNavigationButtonVariants = VariantProps<typeof gandalfNavigationButtonVariants>
export type GandalfNavigationButtonColor = NonNullable<GandalfNavigationButtonVariants['color']>
