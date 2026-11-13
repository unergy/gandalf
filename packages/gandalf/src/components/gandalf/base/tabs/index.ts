import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import type { InjectionKey, Ref } from 'vue'

export { default as GTabs } from './GTabs.vue'
export { default as GTabsList } from './GTabsList.vue'
export { default as GTabsTrigger } from './GTabsTrigger.vue'
export { default as GTabsContent } from './GTabsContent.vue'

// Shared injection keys so GTabsTrigger can read context from GTabsList
export const tabsVariantKey: InjectionKey<Ref<GandalfTabsVariant>> = Symbol('tabs-variant')
export const tabsAlignKey: InjectionKey<Ref<GandalfTabsAlign>> = Symbol('tabs-align')

// Figma: the three tab molecules. "Tabs Toggle Primary" (Tab Main Group) is a white card,
// "Tabs Toggle Secondary" (Tab Secondary Group) a slate-100 pill, and "Tabs" a row of Tab Items
// with 16px spacers whose 1px bni/border line runs the full width (drawn as an inset shadow so the
// active tab's 3px underline can paint over it without shifting the label).
export const gandalfTabsListVariants = cva('inline-flex items-center', {
  variants: {
    variant: {
      'toggle-primary': 'bg-card h-14 gap-1 rounded-2xl p-2',
      'toggle-secondary': 'bg-base-loud h-8 gap-0 overflow-hidden rounded-xl p-0',
      tab: 'h-10 w-full gap-4 rounded-none bg-transparent p-0 shadow-[inset_0_-1px_0_var(--color-bni-border)]',
    },
    align: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      stretch: '',
    },
    fullWidth: {
      true: 'w-full',
      false: '',
    },
  },
  compoundVariants: [
    // align:stretch requires a full-width container so flex-1 triggers can fill equal space
    { align: 'stretch', class: 'w-full' },
  ],
  defaultVariants: {
    variant: 'toggle-primary',
    align: 'start',
    fullWidth: false,
  },
})

// Figma: Toggle Tab Item, Toogle Tab Secondary and Tab Item (Type=Tab). Only declares what differs
// from the shadcn TabsTrigger base (layout, disabled, focus ring and 16px icons stay). Hover and
// pressed use Figma's alpha "Opacity" layer; the `data-[state=active]:hover:` pairs keep the
// activated look while hovered, which Figma does not draw.
export const gandalfTabsTriggerVariants = cva(
  'cursor-pointer text-base leading-normal font-semibold focus-visible:outline-none',
  {
    variants: {
      variant: {
        'toggle-primary': [
          'text-muted-foreground-quiet h-10 rounded-xl px-3 py-2',
          'hover:overlay-dark-5 active:overlay-dark-8',
          'data-[state=active]:bg-base-base data-[state=active]:border-primary data-[state=active]:text-primary',
          'data-[state=active]:hover:bg-none',
        ].join(' '),
        'toggle-secondary': [
          'text-base-foreground-extra-quiet h-8 rounded-xl border-0 px-2 py-1',
          'hover:overlay-dark-5 active:overlay-dark-8',
          'data-[state=active]:bg-base-inverse data-[state=active]:text-base-on-inverse data-[state=active]:shadow-none',
          'data-[state=active]:hover:bg-none',
        ].join(' '),
        tab: [
          'text-muted-foreground-quiet hover:text-primary-quiet h-10 gap-2 rounded-none border-0 p-2',
          'data-[state=active]:text-primary data-[state=active]:hover:text-primary data-[state=active]:bg-transparent',
          'data-[state=active]:shadow-[inset_0_-3px_0_var(--color-primary)]',
        ].join(' '),
      },
      align: {
        start: '',
        center: '',
        end: '',
        stretch: 'flex-1',
      },
    },
    compoundVariants: [
      // The tab list is always full width; its items keep their content width unless align="stretch"
      { variant: 'tab', align: ['start', 'center', 'end'], class: 'flex-none' },
    ],
    defaultVariants: {
      variant: 'toggle-primary',
      align: 'start',
    },
  },
)

export type GandalfTabsListVariants = VariantProps<typeof gandalfTabsListVariants>
export type GandalfTabsVariant = NonNullable<GandalfTabsListVariants['variant']>
export type GandalfTabsAlign = NonNullable<GandalfTabsListVariants['align']>
