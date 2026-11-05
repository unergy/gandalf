import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as GCardToggle } from './CardToggle.vue'

// Figma: Card → Card Toggle. Property names (`type`, `report` / `doble`) follow the design.
export const gandalfCardToggleVariants = cva(
  'group flex w-full cursor-pointer overflow-clip rounded-xl border-[1.5px] border-transparent bg-card text-left outline-none focus-visible:ring-2 focus-visible:ring-ring data-[state=on]:border-accent-primary-foreground data-[state=on]:bg-accent-primary',
  {
    variants: {
      type: {
        report: 'h-10',
        doble: 'h-14',
      },
    },
    defaultVariants: {
      type: 'doble',
    },
  },
)

export const gandalfCardToggleAvatarVariants = cva(
  'flex shrink-0 items-center justify-center rounded-lg',
  {
    variants: {
      type: {
        report: 'size-6 [&_svg]:size-3',
        doble: 'size-10 [&_svg]:size-4',
      },
      color: {
        default: 'bg-default-muted text-default-bold',
        action: 'bg-action-muted text-action-bold',
        information: 'bg-information-muted text-information-bold',
        success: 'bg-success-muted text-success-bold',
        warning: 'bg-warning-muted text-warning-bold',
        destructive: 'bg-destructive-muted text-destructive-bold',
      },
    },
    defaultVariants: {
      type: 'doble',
      color: 'default',
    },
  },
)

export type GandalfCardToggleVariants = VariantProps<typeof gandalfCardToggleVariants>
export type GandalfCardToggleType = NonNullable<GandalfCardToggleVariants['type']>
export type GandalfCardToggleColor = NonNullable<
  VariantProps<typeof gandalfCardToggleAvatarVariants>['color']
>
