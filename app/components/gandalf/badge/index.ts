export { default as GBadge } from './GBadge.vue'

const colors = {
  default: { text: 'text-default', bg: 'bg-default-muted', border: 'border-default' },
  action: { text: 'text-action', bg: 'bg-action-muted', border: 'border-action' },
  information: { text: 'text-information', bg: 'bg-information-muted', border: 'border-information' },
  success: { text: 'text-success', bg: 'bg-success-muted', border: 'border-success' },
  warning: { text: 'text-warning', bg: 'bg-warning-muted', border: 'border-warning' },
  destructive: { text: 'text-destructive', bg: 'bg-destructive-muted', border: 'border-destructive' },
} as const

type ColorTokens = (typeof colors)[keyof typeof colors]

const variants = {
  default: (c: ColorTokens) => `${c.bg} ${c.text} border-transparent`,
  outline: (c: ColorTokens) => `${c.border} ${c.text} ${c.bg}`,
} as const

export type GandalfBadgeColor = keyof typeof colors
export type GandalfBadgeVariant = keyof typeof variants

export function gandalfBadgeVariants(
  variant: GandalfBadgeVariant = 'default',
  color: GandalfBadgeColor = 'default',
): string {
  return variants[variant](colors[color])
}
