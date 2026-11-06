<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { SidebarHeader } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'

// Figma does not draw a header in the Sidebar page; this keeps the slot aligned with the Menu
// (8px of side padding, 4px between children).
const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <SidebarHeader :class="cn('gap-1 px-2 py-0', props.class)">
    <slot />
  </SidebarHeader>
</template>
