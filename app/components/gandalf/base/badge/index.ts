import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as GBadge } from './GBadge.vue'

const colors = {
  default: { text: 'text-default', bg: 'bg-default-muted', border: 'border-default' },
  action: { text: 'text-action', bg: 'bg-action-muted', border: 'border-action' },
  information: {
    text: 'text-information',
    bg: 'bg-information-muted',
    border: 'border-information',
  },
  success: { text: 'text-success', bg: 'bg-success-muted', border: 'border-success' },
  warning: { text: 'text-warning', bg: 'bg-warning-muted', border: 'border-warning' },
  destructive: {
    text: 'text-destructive',
    bg: 'bg-destructive-muted',
    border: 'border-destructive',
  },
} as const

export type GandalfBadgeColor = keyof typeof colors

export const gandalfBadgeVariants = cva(
  'transition-all duration-200 hover:opacity-80 active:opacity-100',
  {
    variants: {
      variant: {
        default: 'border-transparent',
        outline: '',
      },
      shape: {
        rounded: 'rounded-full',
        square: 'rounded-sm',
      },
      size: {
        sm: '',
        default: '',
        lg: '',
        icon: 'size-6 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      shape: 'rounded',
      size: 'default',
    },
  },
)

export type GandalfBadgeVariants = VariantProps<typeof gandalfBadgeVariants>
export type GandalfBadgeVariant = NonNullable<GandalfBadgeVariants['variant']>
export type GandalfBadgeShape = NonNullable<GandalfBadgeVariants['shape']>
export type GandalfBadgeSize = NonNullable<GandalfBadgeVariants['size']>

export function gandalfBadgeColorClass(
  variant: GandalfBadgeVariant = 'default',
  color: GandalfBadgeColor = 'default',
): string {
  const c = colors[color]
  return variant === 'default' ? `${c.bg} ${c.text}` : `${c.border} ${c.text} ${c.bg}`
}
