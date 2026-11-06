import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as GVisualizationCard } from './VisualizationCard.vue'
export { default as GVisualizationCardField } from './VisualizationCardField.vue'
export { default as GVisualizationLayoutCard } from './VisualizationLayoutCard.vue'
export { default as GVisualizationLayoutField } from './VisualizationLayoutField.vue'

// Figma: Visualization → Visualization Card Field. Two columns of the same width (label / content),
// 40px min height and 67px max, which is three lines of value text. Divider=Yes draws the bni/border
// line under the row.
export const gandalfVisualizationCardFieldVariants = cva(
  'grid w-full grid-cols-2 gap-x-2 overflow-clip py-0',
  {
    variants: {
      divider: {
        true: 'border-bni-border border-b',
        false: '',
      },
    },
    defaultVariants: {
      divider: false,
    },
  },
)

export type GandalfVisualizationCardFieldVariants = VariantProps<
  typeof gandalfVisualizationCardFieldVariants
>

// Figma: Visualization → Visualization Layout Field. Label on top (14px) and value below (16px) in a
// 56px column, with 16px of air on each side. Divider=Yes draws a 32px vertical rule 16px from the
// right edge — the "Size Box" of the design. The rule is always laid out and only gets its color
// here or from the card, so GVisualizationLayoutCard can turn it on per column.
export const gandalfVisualizationLayoutFieldVariants = cva(
  "relative flex items-center justify-center overflow-hidden px-4 py-2 after:absolute after:top-1/2 after:right-4 after:h-8 after:w-0 after:-translate-y-1/2 after:border-l after:border-transparent after:content-['']",
  {
    variants: {
      divider: {
        true: 'after:border-bni-border-loud',
        false: '',
      },
    },
    defaultVariants: {
      divider: false,
    },
  },
)

export type GandalfVisualizationLayoutFieldVariants = VariantProps<
  typeof gandalfVisualizationLayoutFieldVariants
>

// Figma: Visualization → Visualization Card Vertical / Horizontal. A base/base box with 16px corners
// and 12px of horizontal padding. Every row but the last one carries the divider, so the fields
// inside do not need the `divider` prop.
export const gandalfVisualizationCardVariants = cva('bg-base-base rounded-2xl px-3', {
  variants: {
    layout: {
      vertical:
        '[&>*:not(:last-child)]:border-bni-border flex flex-col [&>*:not(:last-child)]:border-b',
      horizontal:
        '[&>*:not(:nth-last-child(-n+2))]:border-bni-border grid grid-cols-2 gap-x-4 [&>*:not(:nth-last-child(-n+2))]:border-b',
    },
  },
  defaultVariants: {
    layout: 'vertical',
  },
})

export type GandalfVisualizationCardVariants = VariantProps<typeof gandalfVisualizationCardVariants>
export type GandalfVisualizationCardLayout = NonNullable<GandalfVisualizationCardVariants['layout']>

// Figma: Visualization → Visualization Layout Item (the "Visualization Layout Card" frame). A white
// card with 12px corners: a header — the Accordeon in the design — and a row of layout fields.
export const gandalfVisualizationLayoutCardVariants = cva(
  'bg-card flex w-full flex-col overflow-hidden rounded-xl',
)

// The row of fields. Every field but the last of each row shows its vertical rule.
export const gandalfVisualizationLayoutCardItemsVariants = cva('grid w-full', {
  variants: {
    columns: {
      1: 'grid-cols-1',
      2: '[&>*:not(:nth-child(2n)):not(:last-child)]:after:border-bni-border-loud grid-cols-2',
      3: '[&>*:not(:nth-child(3n)):not(:last-child)]:after:border-bni-border-loud grid-cols-3',
      4: '[&>*:not(:nth-child(4n)):not(:last-child)]:after:border-bni-border-loud grid-cols-4',
    },
  },
  defaultVariants: {
    columns: 4,
  },
})

export type GandalfVisualizationLayoutCardItemsVariants = VariantProps<
  typeof gandalfVisualizationLayoutCardItemsVariants
>
export type GandalfVisualizationLayoutCardColumns = NonNullable<
  GandalfVisualizationLayoutCardItemsVariants['columns']
>
