import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as GCheckbox } from './GCheckbox.vue'

// Figma: Check, Type=Square (checkbox) and Type=Circle (radio). Outline Lucide glyphs instead of
// shadcn's filled box: quiet when off, purple (accent-pr/foreground) when on. Hovering previews the
// next state. The glyph is a mask on ::before, so the control keeps its focus ring.
export const gandalfCheckVariants = cva(
  [
    'relative size-4 shrink-0 border-0 bg-transparent shadow-none text-base-foreground-extra-quiet',
    'before:absolute before:inset-0 before:bg-current',
    'data-[state=checked]:bg-transparent data-[state=checked]:text-accent-primary-foreground',
    'enabled:hover:not-data-[state=checked]:text-base-foreground-quiet',
    'disabled:text-muted-foreground-quiet disabled:opacity-100 disabled:data-[state=checked]:text-muted-foreground-quiet',
  ],
  {
    variants: {
      type: {
        square: [
          'rounded-sm before:check-glyph-square',
          'enabled:hover:before:check-glyph-square-checked',
          'data-[state=checked]:before:check-glyph-square-checked enabled:hover:data-[state=checked]:before:check-glyph-square',
          'data-[state=indeterminate]:text-accent-primary-foreground data-[state=indeterminate]:before:check-glyph-square-minus',
        ],
        circle: [
          'rounded-full before:check-glyph-circle',
          'enabled:hover:before:check-glyph-circle-checked',
          'data-[state=checked]:before:check-glyph-circle-checked enabled:hover:data-[state=checked]:before:check-glyph-circle',
        ],
      },
    },
    defaultVariants: {
      type: 'square',
    },
  },
)

export type GandalfCheckVariants = VariantProps<typeof gandalfCheckVariants>
