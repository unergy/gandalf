<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { SidebarContent } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { gandalfSidebarContentVariants } from './index'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <SidebarContent :class="cn(gandalfSidebarContentVariants(), props.class)">
    <slot />
  </SidebarContent>
</template>
