<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { SidebarMenuSub } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { useSidebarCollapsibleRail } from './context'
import { gandalfSidebarMenuSubVariants } from './index'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const rail = useSidebarCollapsibleRail()
</script>

<template>
  <!-- In the floating menu the rows are menu items: no list, no rule. -->
  <div v-if="rail" role="group" :class="cn('flex flex-col', props.class)">
    <slot />
  </div>
  <SidebarMenuSub v-else :class="cn(gandalfSidebarMenuSubVariants(), props.class)">
    <slot />
  </SidebarMenuSub>
</template>
