<script setup lang="ts">
import type { Component, HTMLAttributes } from 'vue'
import type { SidebarNavGroup, SidebarNavItem } from '@/components/gandalf/kit/sidebar'
import { GSidebarInset, GSidebarProvider } from '@/components/gandalf/base/sidebar'
import { GHeader } from '@/components/gandalf/kit/header'
import { GKitSidebar } from '@/components/gandalf/kit/sidebar'
import { cn } from '@/lib/utils'
import { gandalfLayoutContentVariants, gandalfLayoutSidebarClass } from './index'

// Figma: Layouts › 1440px — the app shell every layout shares: the Header across the top, the
// Sidebar on the left below it, and the scrolling content on the right.
const props = withDefaults(
  defineProps<{
    /** Groups of the GKitSidebar. Leave empty and use the `sidebar` slot for a custom rail. */
    groups?: SidebarNavGroup[]
    /** `value` of the active sidebar item (v-model). */
    modelValue?: string
    /** Component for sidebar items with `to`, such as `NuxtLink` or `RouterLink`. */
    linkAs?: Component | string
    /** Expanded or collapsed sidebar (v-model:open). */
    open?: boolean
    defaultOpen?: boolean
    class?: HTMLAttributes['class']
    /** Classes for the `<main>` that holds the page. */
    contentClass?: HTMLAttributes['class']
  }>(),
  {
    groups: () => [],
    modelValue: undefined,
    linkAs: undefined,
    open: undefined,
    defaultOpen: true,
    class: undefined,
    contentClass: undefined,
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'update:open', value: boolean): void
  (e: 'select', item: SidebarNavItem): void
}>()
</script>

<template>
  <GSidebarProvider
    :open="props.open"
    :default-open="defaultOpen"
    :class="cn('h-svh min-h-0 flex-col overflow-hidden', props.class)"
    @update:open="(value: boolean) => emit('update:open', value)"
  >
    <slot name="header">
      <GHeader />
    </slot>

    <div class="relative flex min-h-0 flex-1">
      <slot name="sidebar">
        <GKitSidebar
          v-if="groups.length"
          :groups="groups"
          :model-value="modelValue"
          :link-as="linkAs"
          :class="gandalfLayoutSidebarClass"
          @update:model-value="(value: string) => emit('update:modelValue', value)"
          @select="(item: SidebarNavItem) => emit('select', item)"
        />
      </slot>

      <GSidebarInset :class="cn(gandalfLayoutContentVariants(), contentClass)">
        <slot />
      </GSidebarInset>
    </div>
  </GSidebarProvider>
</template>
