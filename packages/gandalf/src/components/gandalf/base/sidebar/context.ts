import type { ComputedRef, InjectionKey } from 'vue'
import { computed, inject } from 'vue'

// GSidebarCollapsible tells its parts whether they render inline (expanded rail, mobile sheet) or
// as a floating menu next to the icon (collapsed rail).
export interface GSidebarCollapsibleContext {
  rail: ComputedRef<boolean>
}

export const gSidebarCollapsibleKey: InjectionKey<GSidebarCollapsibleContext> =
  Symbol('GSidebarCollapsible')

/** True when the nested menu must open as a floating menu (collapsed icon rail). */
export function useSidebarCollapsibleRail(): ComputedRef<boolean> {
  const context = inject(gSidebarCollapsibleKey, null)
  return computed(() => context?.rail.value ?? false)
}
