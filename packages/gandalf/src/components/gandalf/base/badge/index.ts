import type { VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'
import { cva } from 'class-variance-authority'

export { default as GBadge } from './GBadge.vue'

// Figma: Badge, Semantic=… — fill {color}/object (`-muted`), text and outline {color}/objectFg
// (`-bold`). The Action outline uses alpha/on-action-aux (#2b7fff) in the design.
const colors = {
  default: {
    text: 'text-default-bold',
    bg: 'bg-default-muted',
    hover: '[a&]:hover:bg-default-muted',
    border: 'border-default-bold',
  },
  action: {
    text: 'text-action-bold',
    bg: 'bg-action-muted',
    hover: '[a&]:hover:bg-action-muted',
    border: 'border-blue-500',
  },
  information: {
    text: 'text-information-bold',
    bg: 'bg-information-muted',
    hover: '[a&]:hover:bg-information-muted',
    border: 'border-information-bold',
  },
  success: {
    text: 'text-success-bold',
    bg: 'bg-success-muted',
    hover: '[a&]:hover:bg-success-muted',
    border: 'border-success-bold',
  },
  warning: {
    text: 'text-warning-bold',
    bg: 'bg-warning-muted',
    hover: '[a&]:hover:bg-warning-muted',
    border: 'border-warning-bold',
  },
  destructive: {
    text: 'text-destructive-bold',
    bg: 'bg-destructive-muted',
    hover: '[a&]:hover:bg-destructive-muted',
    border: 'border-destructive-bold',
  },
} as const

export type GandalfBadgeColor = keyof typeof colors | (string & {})

// Figma: Badge. Type=Tonal / Outlined, Size=md / sm / xs (28 / 24 / 22px), Shape=Rounded / Square.
// Padding includes Figma's 2px label inset; an icon alone falls back to the outer padding, so it
// stays square. Only links and buttons get the hover / press overlays.
export const gandalfBadgeVariants = cva(
  'max-w-[180px] border font-normal [a&]:hover:overlay-dark-8 [a&]:active:overlay-dark-12 [button&]:hover:overlay-dark-8 [button&]:active:overlay-dark-12',
  {
    variants: {
      variant: {
        tonal: 'border-transparent',
        outlined: '',
      },
      shape: {
        rounded: 'rounded-full',
        square: 'rounded-sm',
      },
      size: {
        md: 'h-7 gap-1.5 px-2 py-0 text-base leading-normal has-[>svg:only-child]:px-1.5 [&>svg]:size-4',
        sm: 'h-6 gap-1.5 px-[7px] py-0 text-sm leading-[normal] has-[>svg:only-child]:px-[5px] [&>svg]:size-3.5',
        xs: 'h-[22px] gap-1.5 px-1.5 py-0 text-sm leading-[normal] has-[>svg:only-child]:px-1 [&>svg]:size-3.5',
      },
    },
    defaultVariants: {
      variant: 'tonal',
      shape: 'rounded',
      size: 'md',
    },
  },
)

export type GandalfBadgeVariants = VariantProps<typeof gandalfBadgeVariants>
export type GandalfBadgeVariant = NonNullable<GandalfBadgeVariants['variant']>
export type GandalfBadgeShape = NonNullable<GandalfBadgeVariants['shape']>
export type GandalfBadgeSize = NonNullable<GandalfBadgeVariants['size']>

function isSemanticColor(color: GandalfBadgeColor): color is keyof typeof colors {
  return color in colors
}

const HEX_COLOR_REGEX = /^#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/

export function isHexColor(color: string): boolean {
  return HEX_COLOR_REGEX.test(color)
}

function expandHex(hex: string): string {
  const short = hex.slice(1)
  return short.length === 3 || short.length === 4
    ? short
        .split('')
        .map((c) => c + c)
        .join('')
    : short
}

function hexToRgb(hex: string): [number, number, number] {
  const full = expandHex(hex)
  return [
    Number.parseInt(full.slice(0, 2), 16),
    Number.parseInt(full.slice(2, 4), 16),
    Number.parseInt(full.slice(4, 6), 16),
  ]
}

function rgbToHueAndSaturation(
  r: number,
  g: number,
  b: number,
): { hue: number; saturation: number } {
  const rNorm = r / 255
  const gNorm = g / 255
  const bNorm = b / 255
  const max = Math.max(rNorm, gNorm, bNorm)
  const min = Math.min(rNorm, gNorm, bNorm)
  const delta = max - min
  const l = (max + min) / 2

  if (delta === 0) return { hue: 0, saturation: 0 }

  const saturation = delta / (1 - Math.abs(2 * l - 1))

  let hue: number
  if (max === rNorm) hue = ((gNorm - bNorm) / delta) % 6
  else if (max === gNorm) hue = (bNorm - rNorm) / delta + 2
  else hue = (rNorm - gNorm) / delta + 4

  hue *= 60
  if (hue < 0) hue += 360

  return { hue, saturation: saturation * 100 }
}

// Fixed saturation/lightness so any custom hex badge shares the same visual
// weight as the semantic colors — only the hue (the color itself) changes.
const CUSTOM_BOLD_SATURATION = 72
const CUSTOM_BOLD_LIGHTNESS = 42
const CUSTOM_MUTED_SATURATION = 85
const CUSTOM_MUTED_LIGHTNESS = 93
const ACHROMATIC_SATURATION_THRESHOLD = 8

export function gandalfBadgeColorClass(
  variant: GandalfBadgeVariant = 'tonal',
  color: GandalfBadgeColor = 'default',
): string {
  if (!isSemanticColor(color)) return ''

  const c = colors[color]
  // `hover` keeps shadcn's link hover from replacing the semantic fill.
  return variant === 'tonal'
    ? `${c.bg} ${c.hover} ${c.text}`
    : `${c.border} ${c.text} ${c.bg} ${c.hover}`
}

export function gandalfBadgeColorStyle(
  variant: GandalfBadgeVariant = 'tonal',
  color: GandalfBadgeColor = 'default',
): HTMLAttributes['style'] | undefined {
  if (isSemanticColor(color) || !isHexColor(color)) return undefined

  const { hue, saturation } = rgbToHueAndSaturation(...hexToRgb(color))
  const isAchromatic = saturation < ACHROMATIC_SATURATION_THRESHOLD

  const boldSaturation = isAchromatic ? 0 : CUSTOM_BOLD_SATURATION
  const mutedSaturation = isAchromatic ? 0 : CUSTOM_MUTED_SATURATION
  const bold = `hsl(${hue}, ${boldSaturation}%, ${CUSTOM_BOLD_LIGHTNESS}%)`
  const muted = `hsl(${hue}, ${mutedSaturation}%, ${CUSTOM_MUTED_LIGHTNESS}%)`

  return variant === 'outlined'
    ? { color: bold, borderColor: bold, backgroundColor: muted }
    : { color: bold, backgroundColor: muted }
}
