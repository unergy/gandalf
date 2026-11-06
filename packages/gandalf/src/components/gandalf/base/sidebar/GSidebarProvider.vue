<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { SidebarProvider } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { GANDALF_SIDEBAR_WIDTH, GANDALF_SIDEBAR_WIDTH_ICON } from './index'

const props = withDefaults(
  defineProps<{
    defaultOpen?: boolean
    open?: boolean
    class?: HTMLAttributes['class']
  }>(),
  {
    defaultOpen: undefined,
    open: undefined,
    class: undefined,
  },
)

const emits = defineEmits<{
  'update:open': [open: boolean]
}>()
</script>

<template>
  <SidebarProvider
    :default-open="defaultOpen"
    :open="props.open"
    :class="cn(props.class)"
    :style="{
      '--sidebar-width': GANDALF_SIDEBAR_WIDTH,
      '--sidebar-width-icon': GANDALF_SIDEBAR_WIDTH_ICON,
    }"
    @update:open="(value: boolean) => emits('update:open', value)"
  >
    <slot />
  </SidebarProvider>
</template>
