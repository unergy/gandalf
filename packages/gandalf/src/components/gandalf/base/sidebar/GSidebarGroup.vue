<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { SidebarGroup } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { gandalfSidebarGroupVariants } from './index'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <SidebarGroup :class="cn(gandalfSidebarGroupVariants(), props.class)">
    <slot />
  </SidebarGroup>
</template>
