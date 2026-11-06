import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as GProgressBar } from './GProgressBar.vue'

// Figma: Progress bar → Progress Bar. The track is base/base-loud, 6px tall and square (no
// corner radius in the design); the fill is success/success. The `data-slot` selector repaints
// ui/progress's indicator, which hardcodes `bg-primary` and takes no class of its own.
export const gandalfProgressBarVariants = cva(
  'bg-base-loud h-1.5 w-full min-w-0 flex-1 overflow-hidden rounded-none [&_[data-slot=progress-indicator]]:bg-success',
)

// Figma: the value next to the bar, Body/sm in base/foreground. Figma fixes it at 50px; here it
// is a minimum so a custom label never clips its own text, and bars still line up in a column.
export const gandalfProgressBarLabelVariants = cva(
  'text-base-foreground min-w-[50px] shrink-0 truncate text-sm leading-[normal] font-normal',
)

export type GandalfProgressBarVariants = VariantProps<typeof gandalfProgressBarVariants>

/**
 * Figma's label format: always five characters plus `%`, padded with a leading zero
 * ("00.00%", "25.00%", "100.0%").
 */
export function gandalfProgressBarValueLabel(value: number): string {
  const clamped = Math.min(100, Math.max(0, Number.isFinite(value) ? value : 0))
  const intLength = Math.max(2, Math.trunc(clamped).toString().length)
  const decimals = Math.max(0, 4 - intLength)
  return `${clamped.toFixed(decimals).padStart(5, '0')}%`
}
