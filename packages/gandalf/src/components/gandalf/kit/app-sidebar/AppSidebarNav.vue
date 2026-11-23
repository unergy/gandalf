<script setup lang="ts">
import type { Component, HTMLAttributes } from 'vue'
import type { SidebarNavGroup, SidebarNavItem } from './types'
import { ChevronRight } from 'lucide-vue-next'
import { computed } from 'vue'
import {
  GSidebar,
  GSidebarCollapsible,
  GSidebarCollapsibleContent,
  GSidebarCollapsibleTrigger,
  GSidebarContent,
  GSidebarFooter,
  GSidebarGroup,
  GSidebarGroupContent,
  GSidebarGroupLabel,
  GSidebarHeader,
  GSidebarMenu,
  GSidebarMenuButton,
  GSidebarMenuItem,
  GSidebarMenuSub,
  GSidebarMenuSubButton,
  GSidebarMenuSubItem,
  useSidebar,
} from '@/components/gandalf/base/sidebar'

// A navigation rail built from GSidebar: groups of items that collapse into the 52px icon rail,
// with a tooltip per item while collapsed. It knows nothing about routes or permissions: pass the
// items you want shown and the active `value`. Must sit below a GSidebarProvider, which also
// drives the GSidebarTrigger that opens and closes it.
const props = withDefaults(
  defineProps<{
    /** Groups of items, drawn in order. Empty groups are skipped. */
    groups: SidebarNavGroup[]
    /** `value` of the active item (Figma: Status=Actived). */
    modelValue?: string
    /**
     * Component used for items with `to` — e.g. `NuxtLink` or `RouterLink`. Without it, items
     * render as `<a href>` (when they have `href`) or as buttons.
     */
    linkAs?: Component | string
    /** Accessible name of the `<nav>` landmark. */
    ariaLabel?: string
    side?: 'left' | 'right'
    variant?: 'sidebar' | 'floating' | 'inset'
    collapsible?: 'offcanvas' | 'icon' | 'none'
    class?: HTMLAttributes['class']
  }>(),
  {
    modelValue: undefined,
    linkAs: undefined,
    ariaLabel: 'Navigation',
    side: 'left',
    variant: 'sidebar',
    collapsible: 'icon',
    class: undefined,
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'select', item: SidebarNavItem): void
}>()

const { state } = useSidebar()

const visibleGroups = computed(() => props.groups.filter((group) => group.items.length > 0))

function isActive(item: SidebarNavItem): boolean {
  return item.value === props.modelValue
}

/** A parent is open by default, and highlighted, while one of its children is the current page. */
function hasActiveChild(item: SidebarNavItem): boolean {
  return item.children?.some(isActive) ?? false
}

function tagFor(item: SidebarNavItem): Component | string {
  if (item.to !== undefined && props.linkAs) return props.linkAs
  return item.href ? 'a' : 'button'
}

function attrsFor(item: SidebarNavItem): Record<string, unknown> {
  const tag = tagFor(item)
  if (tag === 'button') return { type: 'button', disabled: item.disabled }
  return {
    to: tag === 'a' ? undefined : item.to,
    href: tag === 'a' ? item.href : undefined,
    'aria-current': isActive(item) ? 'page' : undefined,
    'aria-disabled': item.disabled || undefined,
    tabindex: item.disabled ? -1 : undefined,
  }
}

function select(event: MouseEvent, item: SidebarNavItem) {
  if (item.disabled) {
    event.preventDefault()
    return
  }
  emit('update:modelValue', item.value)
  emit('select', item)
}
</script>

<template>
  <GSidebar :side="side" :variant="variant" :collapsible="collapsible" :class="props.class">
    <GSidebarHeader v-if="$slots.header">
      <slot name="header" />
    </GSidebarHeader>

    <GSidebarContent>
      <nav :aria-label="ariaLabel" class="contents">
        <GSidebarGroup
          v-for="group in visibleGroups"
          :key="group.id ?? group.label ?? group.items[0]!.value"
        >
          <!-- A title without an icon has nothing to show in the collapsed rail. -->
          <GSidebarGroupLabel v-if="group.label && (group.icon || state === 'expanded')">
            <component :is="group.icon" v-if="group.icon" />
            <span>{{ group.label }}</span>
          </GSidebarGroupLabel>

          <GSidebarGroupContent>
            <GSidebarMenu>
              <template v-for="item in group.items" :key="item.value">
                <GSidebarCollapsible
                  v-if="item.children?.length"
                  :default-open="hasActiveChild(item)"
                  :active="hasActiveChild(item)"
                  :disabled="item.disabled"
                >
                  <GSidebarCollapsibleTrigger>
                    <GSidebarMenuButton :tooltip="item.title" :disabled="item.disabled">
                      <component :is="item.icon" v-if="item.icon" />
                      <span>{{ item.title }}</span>
                      <ChevronRight />
                    </GSidebarMenuButton>
                  </GSidebarCollapsibleTrigger>
                  <GSidebarCollapsibleContent :label="item.title">
                    <GSidebarMenuSub>
                      <GSidebarMenuSubItem v-for="child in item.children" :key="child.value">
                        <GSidebarMenuSubButton
                          as-child
                          :is-active="isActive(child)"
                          :aria-disabled="child.disabled || undefined"
                        >
                          <component
                            :is="tagFor(child)"
                            v-bind="attrsFor(child)"
                            :class="child.disabled && 'pointer-events-none opacity-50'"
                            @click="select($event, child)"
                          >
                            <slot name="item" :item="child" :active="isActive(child)">
                              <span>{{ child.title }}</span>
                            </slot>
                          </component>
                        </GSidebarMenuSubButton>
                      </GSidebarMenuSubItem>
                    </GSidebarMenuSub>
                  </GSidebarCollapsibleContent>
                </GSidebarCollapsible>
                <GSidebarMenuItem v-else>
                  <GSidebarMenuButton as-child :is-active="isActive(item)" :tooltip="item.title">
                    <component
                      :is="tagFor(item)"
                      v-bind="attrsFor(item)"
                      :class="item.disabled && 'pointer-events-none opacity-50'"
                      @click="select($event, item)"
                    >
                      <slot name="item" :item="item" :active="isActive(item)">
                        <component :is="item.icon" v-if="item.icon" />
                        <span>{{ item.title }}</span>
                      </slot>
                    </component>
                  </GSidebarMenuButton>
                </GSidebarMenuItem>
              </template>
            </GSidebarMenu>
          </GSidebarGroupContent>
        </GSidebarGroup>
      </nav>
    </GSidebarContent>

    <GSidebarFooter v-if="$slots.footer">
      <slot name="footer" />
    </GSidebarFooter>
  </GSidebar>
</template>
