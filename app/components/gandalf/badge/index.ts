import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as GBadge } from './GBadge.vue'

export const gandalfBadgeVariants = cva('', {
  variants: {
    variant: {
      default: 'border-transparent',
      outline: 'bg-transparent',
    },
    color: {
      default: '',
      action: '',
      information: '',
      success: '',
      warning: '',
      destructive: '',
    },
  },
  compoundVariants: [
    // default (muted background + text color)
    { variant: 'default', color: 'default', class: 'bg-default-muted text-default' },
    { variant: 'default', color: 'information', class: 'bg-information-muted text-information' },
    { variant: 'default', color: 'success', class: 'bg-success-muted text-success' },
    { variant: 'default', color: 'action', class: 'bg-action-muted text-action' },
    { variant: 'default', color: 'warning', class: 'bg-warning-muted text-warning' },
    { variant: 'default', color: 'destructive', class: 'bg-destructive-muted text-destructive' },
    // outline (border + text color)
    { variant: 'outline', color: 'default', class: 'border-default text-default bg-default-muted' },
    { variant: 'outline', color: 'action', class: 'border-action text-action bg-action-muted' },
    { variant: 'outline', color: 'information', class: 'border-information text-information bg-information-muted' },
    { variant: 'outline', color: 'success', class: 'border-success text-success bg-success-muted' },
    { variant: 'outline', color: 'warning', class: 'border-warning text-warning bg-warning-muted' },
    { variant: 'outline', color: 'destructive', class: 'border-destructive text-destructive bg-destructive-muted' },
  ],
  defaultVariants: {
    variant: 'default',
    color: 'default',
  },
})

export type GandalfBadgeVariants = VariantProps<typeof gandalfBadgeVariants>
