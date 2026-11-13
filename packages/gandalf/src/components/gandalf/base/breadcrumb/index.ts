import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import type { InjectionKey, Ref } from 'vue'

export { default as GBreadcrumb } from './GBreadcrumb.vue'
export { default as GBreadcrumbEllipsis } from './GBreadcrumbEllipsis.vue'
export { default as GBreadcrumbItem } from './GBreadcrumbItem.vue'
export { default as GBreadcrumbLink } from './GBreadcrumbLink.vue'
export { default as GBreadcrumbList } from './GBreadcrumbList.vue'
export { default as GBreadcrumbPage } from './GBreadcrumbPage.vue'
export { default as GBreadcrumbSeparator } from './GBreadcrumbSeparator.vue'

// GBreadcrumb provides Figma's Size to every part below it.
export const breadcrumbSizeKey: InjectionKey<Ref<GandalfBreadcrumbSize>> = Symbol('breadcrumb-size')

// Figma: Group Breadcrumbs. Items sit next to each other with no gap: the spacing comes from each
// Breadcrumbs Item's own padding. Enabled text is base/foreground-extra-quiet.
export const gandalfBreadcrumbListVariants = cva(
  'text-base-foreground-extra-quiet gap-0 break-words sm:gap-0',
  {
    variants: {
      size: {
        md: 'text-sm',
        xs: 'text-xs',
      },
    },
    defaultVariants: { size: 'md' },
  },
)

// Figma: Breadcrumbs Item. md: 24px tall, 4px on both sides. xs: 4px on the left only.
export const gandalfBreadcrumbItemVariants = cva('gap-0', {
  variants: {
    size: {
      md: 'h-6 px-1',
      xs: 'pl-1',
    },
  },
  defaultVariants: { size: 'md' },
})

// Figma: Breadcrumbs Item, State=Enabled / Hovered. Hover turns text and chevron base/foreground.
export const gandalfBreadcrumbLinkVariants = cva(
  'hover:text-base-foreground focus-visible:ring-ring rounded-sm outline-none focus-visible:ring-2',
  {
    variants: {
      size: {
        md: 'leading-6',
        xs: 'leading-[normal]',
      },
    },
    defaultVariants: { size: 'md' },
  },
)

// Figma: Breadcrumbs Item, State=Activated. Semibold base/foreground, no chevron.
export const gandalfBreadcrumbPageVariants = cva(
  'text-base-foreground leading-[normal] font-semibold',
)

// Figma: the chevron-right inside Breadcrumbs Item (Icon/sm 14px, Icon/xs 12px). md keeps 8px
// between text and icon; xs sets them side by side. It follows the hover of the item before it.
export const gandalfBreadcrumbSeparatorVariants = cva(
  'flex items-center [[data-slot=breadcrumb-item]:has([data-slot=breadcrumb-link]:hover)+&]:text-base-foreground',
  {
    variants: {
      size: {
        md: 'h-6 px-1 [&>svg]:size-3.5',
        xs: '[&>svg]:size-3',
      },
    },
    defaultVariants: { size: 'md' },
  },
)

// Not in Figma: a collapsed item the height of a Breadcrumbs Item, with the icon at Icon size.
export const gandalfBreadcrumbEllipsisVariants = cva('', {
  variants: {
    size: {
      md: 'size-6 [&>svg]:size-3.5',
      xs: 'size-4 [&>svg]:size-3',
    },
  },
  defaultVariants: { size: 'md' },
})

export type GandalfBreadcrumbVariants = VariantProps<typeof gandalfBreadcrumbListVariants>
export type GandalfBreadcrumbSize = NonNullable<GandalfBreadcrumbVariants['size']>
