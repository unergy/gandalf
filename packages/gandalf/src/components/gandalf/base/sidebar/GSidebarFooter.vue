<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { SidebarFooter } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'

// Figma does not draw a footer in the Sidebar page; this keeps the slot aligned with the Menu
// (8px of side padding, 4px between children).
const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <SidebarFooter :class="cn('gap-1 px-2 py-2', props.class)">
    <slot />
  </SidebarFooter>
</template>
