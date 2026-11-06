<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { PanelLeft } from 'lucide-vue-next'
import { GButton } from '@/components/gandalf/base/button'
import { useSidebar } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'

// Figma does not draw the control that switches between Type=Expanded and Type=Icon, so it uses
// the Ghost primary xs button from the Button page.
const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const { toggleSidebar } = useSidebar()
</script>

<template>
  <GButton
    data-slot="sidebar-trigger"
    data-sidebar="trigger"
    variant="ghost-primary"
    size="xs"
    :class="cn(props.class)"
    @click="toggleSidebar"
  >
    <PanelLeft />
    <span class="sr-only">Toggle sidebar</span>
  </GButton>
</template>
