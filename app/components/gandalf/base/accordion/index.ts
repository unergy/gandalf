import type { VariantProps } from 'class-variance-authority'
import type { ComputedRef, InjectionKey } from 'vue'
import { cva } from 'class-variance-authority'

export { default as GAccordion } from './GAccordion.vue'
export { default as GAccordionItem } from './GAccordionItem.vue'
export { default as GAccordionTrigger } from './GAccordionTrigger.vue'
export { default as GAccordionContent } from './GAccordionContent.vue'

export const gandalfAccordionVariants = cva('w-full', {
  variants: {
    variant: {
      default: '',
      layout: 'rounded-xl bg-white',
      blended: '',
      'blended-main': '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export const gandalfAccordionItemVariants = cva('', {
  variants: {
    variant: {
      default: 'border-b last:border-b-0',
      layout: 'border-b px-4 last:border-b-0',
      blended:
        'border-bni-border-loud bg-base-loud border-b px-4 last:border-b-0 data-[state=open]:border-border-extra-loud',
      'blended-main':
        'border-bni-border-loud border-b bg-white px-4 last:border-b-0 data-[state=open]:border-border-extra-loud',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export type GandalfAccordionVariant = NonNullable<
  VariantProps<typeof gandalfAccordionVariants>['variant']
>

export const ACCORDION_VARIANT_KEY: InjectionKey<ComputedRef<GandalfAccordionVariant>> = Symbol(
  'accordion-variant',
)
