<script setup lang="ts">
import type { SidebarProps } from '@/components/ui/sidebar'
import { Sidebar } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { gandalfSidebarVariants } from './index'

const props = withDefaults(defineProps<SidebarProps>(), {
  side: 'left',
  variant: 'sidebar',
  // Figma draws the sidebar in two types, Expanded and Icon, so it collapses to the icon rail.
  collapsible: 'icon',
  class: undefined,
})
</script>

<template>
  <Sidebar
    :side="side"
    :variant="variant"
    :collapsible="collapsible"
    :class="cn(gandalfSidebarVariants(), props.class)"
  >
    <slot />
  </Sidebar>
</template>
