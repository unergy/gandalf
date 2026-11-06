<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { GScrollArea } from '@/components/gandalf/base/scroll-area'
import { cn } from '@/lib/utils'
import { gandalfDetailsPanelBodyContentVariants, gandalfDetailsPanelBodyVariants } from './index'

// Figma: Detail Panel → Content. The scrolling area between the header and the actions.
const props = defineProps<{
  class?: HTMLAttributes['class']
  contentClass?: HTMLAttributes['class']
}>()
</script>

<template>
  <GScrollArea
    data-slot="details-panel-body"
    :class="cn(gandalfDetailsPanelBodyVariants(), props.class)"
  >
    <div :class="cn(gandalfDetailsPanelBodyContentVariants(), props.contentClass)">
      <slot />
    </div>
  </GScrollArea>
</template>
