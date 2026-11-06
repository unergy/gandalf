<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { gandalfDetailsPanelBodyVariants } from './index'

// Figma: Detail Panel → Content. The scrolling area between the header and the actions.
const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <div data-slot="details-panel-body" :class="cn(gandalfDetailsPanelBodyVariants(), props.class)">
    <slot />
  </div>
</template>
