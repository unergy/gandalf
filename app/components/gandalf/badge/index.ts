import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as Badge } from './Badge.vue'

export const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 gap-1 transition-colors',
  {
    variants: {
      variant: {
        default: 'border-transparent',
        outline: 'border',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export type BadgeVariants = VariantProps<typeof badgeVariants>
export type BadgeColor =
  | 'default'
  | 'action'
  | 'information'
  | 'success'
  | 'warning'
  | 'destructive'
