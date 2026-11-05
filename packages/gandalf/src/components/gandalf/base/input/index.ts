import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as GInput } from './GInput.vue'

// Figma: Input → Input Field. Shared by GInput and by the triggers that look like a field (select,
// combobox, date picker). Focus and error-focus draw a 2px border as the 1px border plus a 1px inset
// ring, so the content does not shift. An open trigger looks focused.
export const gandalfFieldVariants = cva(
  [
    'rounded-lg border border-bni-border-loud bg-bni-background py-0 text-base-foreground shadow-none',
    'hover:bg-bni-input',
    'focus-visible:border-base-foreground-quiet focus-visible:bg-bni-input focus-visible:ring-1 focus-visible:ring-base-foreground-quiet focus-visible:ring-inset',
    'data-[state=open]:border-base-foreground-quiet data-[state=open]:bg-bni-input data-[state=open]:ring-1 data-[state=open]:ring-base-foreground-quiet data-[state=open]:ring-inset',
    'aria-invalid:border-destructive aria-invalid:focus-visible:border-destructive aria-invalid:focus-visible:ring-destructive',
    'disabled:border-muted-foreground-quiet disabled:bg-muted disabled:text-muted-foreground-quiet disabled:opacity-100',
  ],
  {
    variants: {
      size: {
        xs: 'h-6 px-2 text-xs md:text-xs',
        sm: 'h-8 px-2.5 text-sm md:text-sm',
        md: 'h-10 px-3 text-base md:text-base',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

export const gandalfInputVariants = (props?: GandalfFieldVariants) =>
  [
    gandalfFieldVariants(props),
    'placeholder:text-base-foreground-extra-quiet disabled:placeholder:text-muted-foreground-quiet',
  ].join(' ')

/** Field look for a wrapper around an <input> (icons inside the field): states follow the input. */
export const gandalfFieldWithinClass =
  'rounded-lg border border-bni-border-loud bg-bni-background text-base-foreground hover:bg-bni-input focus-within:border-base-foreground-quiet focus-within:bg-bni-input focus-within:ring-1 focus-within:ring-base-foreground-quiet focus-within:ring-inset has-[input:disabled]:border-muted-foreground-quiet has-[input:disabled]:bg-muted has-[input:disabled]:text-muted-foreground-quiet'

/** Layout for a <button> that opens a list and looks like a field. */
export const gandalfFieldTriggerClass =
  'flex w-full cursor-pointer items-center justify-between gap-2 text-left whitespace-nowrap outline-none disabled:pointer-events-none disabled:cursor-not-allowed'

/** Placeholder text inside a field trigger. */
export const gandalfFieldPlaceholderClass = 'text-base-foreground-extra-quiet'

export type GandalfFieldVariants = VariantProps<typeof gandalfFieldVariants>
export type GandalfInputVariants = GandalfFieldVariants
export type GandalfInputSize = NonNullable<GandalfFieldVariants['size']>
