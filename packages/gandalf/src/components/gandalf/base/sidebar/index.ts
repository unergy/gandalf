import { cva } from 'class-variance-authority'

export { default as GSidebar } from './GSidebar.vue'
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

/** Sidebar: 8px of vertical air and 4px between groups. */
export const gandalfSidebarContentVariants = cva('gap-1 py-2')

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
  'group-data-[collapsible=icon]:[&>span:last-child]:hidden',
])
