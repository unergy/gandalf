<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { SidebarInset } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <SidebarInset :class="cn(props.class)">
    <slot />
  </SidebarInset>
</template>
