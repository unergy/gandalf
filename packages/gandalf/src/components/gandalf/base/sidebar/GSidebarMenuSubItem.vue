<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { SidebarMenuSubItem } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { useSidebarCollapsibleRail } from './context'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const rail = useSidebarCollapsibleRail()
</script>

<template>
  <slot v-if="rail" />
  <SidebarMenuSubItem v-else :class="cn(props.class)">
    <slot />
  </SidebarMenuSubItem>
</template>
