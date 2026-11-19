import type { Component } from 'vue'

/** One entry of the navigation rail. */
export interface SidebarNavItem {
  /** Unique key. The item whose `value` equals the sidebar's `modelValue` is the active one. */
  value: string
  /** Label shown when expanded, and as the tooltip when the rail is collapsed. */
  title: string
  /** Icon component (Lucide or any SVG component). The collapsed rail shows only this. */
  icon?: Component
  /** Destination passed as `to` to the sidebar's `linkAs` component (NuxtLink, RouterLink…). */
  to?: unknown
  /** Plain URL, rendered as an `<a href>` when there is no `to`. */
  href?: string
  disabled?: boolean
}

/** A titled group of items. */
export interface SidebarNavGroup {
  /** Unique key of the group. Falls back to `label`. */
  id?: string
  /** Sidebar Title. Hidden in the collapsed rail unless the group has an `icon`. */
  label?: string
  /** Icon of the Sidebar Title; with one, the title stays visible as an icon when collapsed. */
  icon?: Component
  items: SidebarNavItem[]
}
