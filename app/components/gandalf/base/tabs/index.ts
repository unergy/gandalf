import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import type { InjectionKey, Ref } from 'vue'

export { default as GTabs } from './GTabs.vue'
export { default as GTabsList } from './GTabsList.vue'
export { default as GTabsTrigger } from './GTabsTrigger.vue'
export { default as GTabsContent } from './GTabsContent.vue'

// Shared injection key so GTabsTrigger can read the variant from GTabsList
export const tabsVariantKey: InjectionKey<Ref<GandalfTabsVariant>> = Symbol('tabs-variant')
export const tabsAlignKey: InjectionKey<Ref<GandalfTabsAlign>> = Symbol('tabs-align')

export const gandalfTabsListVariants = cva('inline-flex items-center', {
  variants: {
    variant: {
      base: 'bg-muted rounded-lg p-[3px] gap-0',
      outline: 'bg-transparent rounded-none p-0 gap-0 border-b border-border w-full',
    },
    align: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      stretch: 'w-full',
    },
  },
  defaultVariants: {
    variant: 'base',
    align: 'start',
  },
})

export const gandalfTabsTriggerVariants = cva(
  "inline-flex items-center justify-center gap-1.5 whitespace-nowrap text-sm font-medium transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        base: 'data-[state=active]:bg-background data-[state=active]:shadow-sm dark:data-[state=active]:bg-input/30 dark:data-[state=active]:text-foreground text-foreground dark:text-muted-foreground h-[calc(100%-1px)] flex-1 rounded-md border border-transparent px-2 py-1',
        outline:
          'h-auto rounded-none px-3 pb-2 pt-1 text-muted-foreground border-b-2 border-b-transparent -mb-px data-[state=active]:bg-transparent data-[state=active]:border-b-primary data-[state=active]:text-primary data-[state=active]:shadow-none',
      },
      align: {
        start: '',
        center: '',
        end: '',
        stretch: 'flex-1',
      },
    },
    defaultVariants: {
      variant: 'base',
      align: 'start',
    },
  },
)

export type GandalfTabsListVariants = VariantProps<typeof gandalfTabsListVariants>
export type GandalfTabsVariant = NonNullable<GandalfTabsListVariants['variant']>
export type GandalfTabsAlign = NonNullable<GandalfTabsListVariants['align']>
