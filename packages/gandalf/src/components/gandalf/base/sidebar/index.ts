import { cva } from 'class-variance-authority'

export { default as GSidebar } from './GSidebar.vue'
export { default as GSidebarCollapsible } from './GSidebarCollapsible.vue'
export { default as GSidebarCollapsibleContent } from './GSidebarCollapsibleContent.vue'
export { default as GSidebarCollapsibleTrigger } from './GSidebarCollapsibleTrigger.vue'
export { default as GSidebarContent } from './GSidebarContent.vue'
export { default as GSidebarFooter } from './GSidebarFooter.vue'
export { default as GSidebarGroup } from './GSidebarGroup.vue'
export { default as GSidebarGroupContent } from './GSidebarGroupContent.vue'
export { default as GSidebarGroupLabel } from './GSidebarGroupLabel.vue'
export { default as GSidebarHeader } from './GSidebarHeader.vue'
export { default as GSidebarInset } from './GSidebarInset.vue'
export { default as GSidebarMenu } from './GSidebarMenu.vue'
export { default as GSidebarMenuButton } from './GSidebarMenuButton.vue'
export { default as GSidebarMenuItem } from './GSidebarMenuItem.vue'
export { default as GSidebarMenuSub } from './GSidebarMenuSub.vue'
export { default as GSidebarMenuSubButton } from './GSidebarMenuSubButton.vue'
export { default as GSidebarMenuSubItem } from './GSidebarMenuSubItem.vue'
export { default as GSidebarProvider } from './GSidebarProvider.vue'
export { default as GSidebarTrigger } from './GSidebarTrigger.vue'

// Read the sidebar state (expanded / collapsed, mobile, toggle) from anywhere below GSidebarProvider.
export { useSidebar } from '@/components/ui/sidebar'

/** Figma: Sidebar, Type=Expanded — the rail is 224px wide. */
export const GANDALF_SIDEBAR_WIDTH = '14rem'
/** Figma: Sidebar, Type=Icon — the collapsed rail is 52px wide. */
export const GANDALF_SIDEBAR_WIDTH_ICON = '52px'

// Figma: Sidebar. Every selector below repeats shadcn's own variant string verbatim so that
// tailwind-merge replaces it instead of keeping both.

/** Sidebar: `sidebar/sidebar` panel with a `bni/border` edge towards the content. */
export const gandalfSidebarVariants = cva('border-sidebar-border')

/** Sidebar: 8px of vertical air and 16px between groups. */
export const gandalfSidebarContentVariants = cva('gap-4 py-2')

/** Sidebar: a Sidebar Title plus its Menu, 4px apart. The padding belongs to each of them. */
export const gandalfSidebarGroupVariants = cva('gap-1 p-0')

/**
 * Sidebar Title. Type=Expanded is a 32px row with 12px of side padding, a 12px icon and 12px text
 * in `sidebar/primary-fg`. Type=Icon keeps only the icon, centred in the collapsed rail.
 */
export const gandalfSidebarGroupLabelVariants = cva([
  'h-8 gap-1.5 rounded-lg px-3 text-xs font-normal text-sidebar-primary-foreground',
  '[&>svg]:size-3',
  'group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:mt-0 group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:opacity-100',
  'group-data-[collapsible=icon]:[&>span]:hidden',
])

/** Sidebar > Menu: 4px between items and 8px of side padding; the collapsed rail has none. */
export const gandalfSidebarMenuVariants = cva('gap-1 px-2 group-data-[collapsible=icon]:px-0')

/**
 * Sidebar Menu Item. Status=Enabled is 14px `sidebar/foreground`; Hovered fills with
 * `sidebar/accent`; Actived fills with `sidebar/primary` and turns the label semibold
 * `sidebar/primary-fg`. Type=Icon is the same row collapsed into the rail.
 */
export const gandalfSidebarMenuButtonVariants = cva([
  'h-8 gap-2 rounded-lg px-2 py-0 text-sm font-normal text-sidebar-foreground',
  '[&>svg]:size-3.5',
  'hover:bg-sidebar-accent hover:text-sidebar-foreground active:bg-sidebar-accent active:text-sidebar-foreground',
  'data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-foreground',
  'data-[active=true]:bg-sidebar-primary data-[active=true]:font-semibold data-[active=true]:text-sidebar-primary-foreground',
  'group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2!',
  'group-data-[collapsible=icon]:[&>span]:hidden group-data-[collapsible=icon]:[&>svg:not(:first-child)]:hidden',
  // Parent of a nested menu (GSidebarCollapsible). Expanded: semibold while a nested row is the
  // current page. Collapsed rail: the icon takes the Actived fill instead, and keeps the hover fill
  // while its floating menu is open.
  'group-data-[child-active=true]/menu-item:font-semibold [&>span]:truncate',
  'group-data-[collapsible=icon]:group-data-[child-active=true]/menu-item:bg-sidebar-primary group-data-[collapsible=icon]:group-data-[child-active=true]/menu-item:text-sidebar-primary-foreground',
  'group-data-[collapsible=icon]:data-[state=open]:bg-sidebar-accent',
  // Trailing chevron of a parent: turns from right to down while the nested menu is open.
  '[&>svg:last-child:not(:first-child)]:ml-auto [&>svg:last-child:not(:first-child)]:size-4 [&>svg:last-child:not(:first-child)]:text-sidebar-foreground [&>svg:last-child:not(:first-child)]:transition-transform group-data-[state=open]/collapsible:[&>svg:last-child:not(:first-child)]:rotate-90',
])

/**
 * Nested menu: a 1px `sidebar/border` rule under the parent's icon, 4px between rows, and rows whose
 * text lines up with the parent's label. It disappears in the collapsed rail.
 */
export const gandalfSidebarMenuSubVariants = cva('mx-0 ml-[15px] mr-0 gap-1 px-0 pl-1.5 py-1')

/** Nested menu: unfolds with the height animation of tw-animate-css. */
export const gandalfSidebarCollapsibleContentVariants = cva(
  'overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down',
)

/** Nested menu row: 32px, 14px text, same Hovered / Actived fills as a Sidebar Menu Item. */
export const gandalfSidebarMenuSubButtonVariants = cva([
  'h-8 gap-2 rounded-lg px-2 text-sm font-normal text-sidebar-foreground',
  'hover:bg-sidebar-accent hover:text-sidebar-foreground active:bg-sidebar-accent active:text-sidebar-foreground',
  'data-[active=true]:bg-sidebar-primary data-[active=true]:font-semibold data-[active=true]:text-sidebar-primary-foreground',
])

/**
 * Nested menu row inside the floating menu of the collapsed rail: a Gandalf Menu Item (36px, 16px
 * text, dark overlays) whose current page keeps the sidebar's Actived fill.
 */
export const gandalfSidebarMenuSubMenuItemVariants = cva([
  'cursor-pointer px-2',
  'data-[active=true]:bg-sidebar-primary data-[active=true]:font-semibold data-[active=true]:text-sidebar-primary-foreground',
  'data-[active=true]:data-[highlighted]:bg-sidebar-primary data-[active=true]:data-[highlighted]:text-sidebar-primary-foreground data-[active=true]:hover:bg-sidebar-primary',
])
