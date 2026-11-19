import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

// The navigation rail (AppSidebarNav.vue) is internal: apps use it through GAppSidebar.
export { default as GAppSidebar } from './AppSidebar.vue'
export { default as GAppSidebarBreadcrumbs } from './AppSidebarBreadcrumbs.vue'
export { default as GAppSidebarTitle } from './AppSidebarTitle.vue'

export type { SidebarNavGroup, SidebarNavItem } from './types'

/**
 * Layouts › Content: the page area right of the Sidebar. Its background is a loose colour in
 * Figma, #F8F8FF, not a variable.
 */
export const gandalfAppSidebarContentVariants = cva('min-w-0 overflow-y-auto bg-[#F8F8FF]')

/**
 * Layouts › Sidebar: GSidebar is fixed to the viewport; inside the layout it fills the row below
 * the Header instead. Same utilities as shadcn's (`fixed`, `h-svh`) so tailwind-merge replaces them.
 */
export const gandalfAppSidebarRailClass = 'absolute h-full'

/**
 * Layouts › Title. First Level Layout: 24px on top, 16px on the sides, 12px below, 8px between
 * the title row and the description. Second Level Layout: 12px above and below, 24px on the sides.
 */
export const gandalfAppSidebarTitleVariants = cva('flex flex-col gap-2', {
  variants: {
    level: {
      first: 'px-4 pt-6 pb-3',
      second: 'px-6 py-3',
    },
  },
  defaultVariants: { level: 'first' },
})

/**
 * Title text. First Level: 30px semibold `base/foreground-loud`. Second Level: 24px semibold
 * `base/foreground`.
 */
export const gandalfAppSidebarTitleTextVariants = cva('min-w-0 truncate leading-[normal]', {
  variants: {
    level: {
      first: 'text-heading-lg text-base-foreground-loud',
      second: 'text-heading-md text-base-foreground',
    },
  },
  defaultVariants: { level: 'first' },
})

/** Layouts › Title › Avatar Item: 32px `card/card` square with a 14px `base/foreground` icon. */
export const gandalfAppSidebarTitleIconClass =
  "bg-card text-base-foreground flex size-8 shrink-0 items-center justify-center rounded-lg [&_svg:not([class*='size-'])]:size-3.5"

/**
 * Second Level Layout › Title (top row): 48px tall, 12px on top, 16px left and 24px right, 8px
 * between the back button, the breadcrumbs and the tools.
 */
export const gandalfAppSidebarBreadcrumbsVariants = cva('flex items-center gap-2 pt-3 pr-6 pl-4')

export type GandalfAppSidebarTitleVariants = VariantProps<typeof gandalfAppSidebarTitleVariants>
export type GandalfAppSidebarLevel = NonNullable<GandalfAppSidebarTitleVariants['level']>
