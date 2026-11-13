import type { VariantProps } from 'class-variance-authority'
import type { ComputedRef, InjectionKey } from 'vue'
import { cva } from 'class-variance-authority'

export { default as GAccordion } from './GAccordion.vue'
export { default as GAccordionItem } from './GAccordionItem.vue'
export { default as GAccordionTrigger } from './GAccordionTrigger.vue'
export { default as GAccordionContent } from './GAccordionContent.vue'

// Figma: Accordeon page. Two molecules: "Accordeon Main" (Type=Visualization / Table) and
// "Accordeon Blended" (Category=Main / Default). Main and Blended Main items are white cards
// stacked 12px apart; Blended Default rows sit flush, divided by bni/border.
export const gandalfAccordionVariants = cva('flex w-full flex-col', {
  variants: {
    variant: {
      main: 'gap-3',
      blended: '',
    },
    category: {
      main: '',
      default: '',
    },
  },
  compoundVariants: [
    { variant: 'blended', category: 'main', class: 'gap-3' },
    { variant: 'blended', category: 'default', class: 'gap-0' },
  ],
  defaultVariants: {
    variant: 'main',
    category: 'main',
  },
})

// Figma: the container of each molecule. Main and Blended Main: white, corner/xl. Table and
// Blended Main get an outline when open (bni/border and bni/border-extra-loud, as in the
// organisms). Blended Default: base/base row with a bni/border divider, base/base-loud disabled.
export const gandalfAccordionItemVariants = cva('overflow-hidden', {
  variants: {
    variant: {
      main: 'bg-card rounded-xl border-0',
      blended: '',
    },
    category: {
      main: '',
      default: '',
    },
    type: {
      visualization: '',
      table: '',
    },
  },
  compoundVariants: [
    {
      variant: 'main',
      type: 'table',
      class: 'data-[state=open]:border-bni-border border border-transparent last:border-b',
    },
    {
      variant: 'blended',
      category: 'main',
      class:
        'data-[state=open]:border-bni-border-extra-loud bg-card rounded-xl border border-transparent last:border-b',
    },
    {
      variant: 'blended',
      category: 'default',
      class: 'bg-base-base border-bni-border data-[disabled]:bg-base-loud border-b last:border-b-0',
    },
  ],
  defaultVariants: {
    variant: 'main',
    category: 'main',
    type: 'visualization',
  },
})

// Figma: the 48px header row and its "Opacity" layer (alpha/dark-8 hovered, dark-12 pressed).
// Selectors repeat shadcn's (`hover:`, `disabled:`, `focus-visible:`) so they replace them.
export const gandalfAccordionTriggerVariants = cva(
  [
    'group h-12 items-center gap-4 rounded-none px-4 py-0 text-xs font-normal',
    'hover:overlay-dark-8 active:overlay-dark-12 hover:no-underline',
    'disabled:cursor-not-allowed disabled:opacity-100',
    'focus-visible:ring-ring focus-visible:border-bni-border focus-visible:ring-2 focus-visible:ring-inset',
  ].join(' '),
  {
    variants: {
      variant: {
        main: '',
        blended: 'data-[state=open]:border-bni-border data-[state=open]:border-b',
      },
      type: {
        visualization: '',
        table: '',
      },
    },
    compoundVariants: [
      {
        variant: 'main',
        type: 'table',
        class: 'data-[state=open]:border-bni-border data-[state=open]:border-b',
      },
    ],
    defaultVariants: {
      variant: 'main',
      type: 'visualization',
    },
  },
)

export type GandalfAccordionVariants = VariantProps<typeof gandalfAccordionVariants>
export type GandalfAccordionVariant = NonNullable<GandalfAccordionVariants['variant']>
export type GandalfAccordionCategory = NonNullable<GandalfAccordionVariants['category']>
export type GandalfAccordionItemVariants = VariantProps<typeof gandalfAccordionItemVariants>
export type GandalfAccordionType = NonNullable<GandalfAccordionItemVariants['type']>

export interface GandalfAccordionContext {
  variant: GandalfAccordionVariant
  category: GandalfAccordionCategory
}

export interface GandalfAccordionItemContext extends GandalfAccordionContext {
  type: GandalfAccordionType
}

export const ACCORDION_KEY: InjectionKey<ComputedRef<GandalfAccordionContext>> =
  Symbol('gandalf-accordion')
export const ACCORDION_ITEM_KEY: InjectionKey<ComputedRef<GandalfAccordionItemContext>> =
  Symbol('gandalf-accordion-item')
