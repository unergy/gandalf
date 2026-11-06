<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { SidebarMenuItem } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <SidebarMenuItem :class="cn(props.class)">
    <slot />
  </SidebarMenuItem>
</template>
