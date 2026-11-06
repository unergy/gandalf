<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { SidebarMenu } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { gandalfSidebarMenuVariants } from './index'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <SidebarMenu :class="cn(gandalfSidebarMenuVariants(), props.class)">
    <slot />
  </SidebarMenu>
</template>
