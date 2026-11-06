<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { SidebarGroupContent } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <SidebarGroupContent :class="cn(props.class)">
    <slot />
  </SidebarGroupContent>
</template>
