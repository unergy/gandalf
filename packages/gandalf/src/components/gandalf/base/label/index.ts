import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as GLabel } from './GLabel.vue'

// Figma: Label. 14px semibold; the required asterisk sits 2px after the text. Disabled changes
// color instead of fading, also when it follows a disabled control (peer / group).
export const gandalfLabelVariants = cva(
  'flex items-center gap-0.5 text-sm leading-[normal] font-semibold text-base-foreground peer-disabled:text-base-foreground-extra-quiet peer-disabled:opacity-100 group-data-[disabled=true]:text-base-foreground-extra-quiet group-data-[disabled=true]:opacity-100',
  {
    variants: {
      disabled: {
        true: 'pointer-events-none cursor-not-allowed text-base-foreground-extra-quiet',
        false: '',
      },
    },
    defaultVariants: {
      disabled: false,
    },
  },
)

export type GandalfLabelVariants = VariantProps<typeof gandalfLabelVariants>
