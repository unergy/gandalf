<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { GandalfVisualizationCardLayout } from './index'
import { cn } from '@/lib/utils'
import { gandalfVisualizationCardVariants } from './index'

// Figma: Visualization → Visualization Card Vertical / Horizontal. Holds GVisualizationCardField
// rows and draws the divider on every row but the last one.
const props = withDefaults(
  defineProps<{
    /** "Vertical" is one field per row; "horizontal" lays them out in two columns. */
    layout?: GandalfVisualizationCardLayout
    class?: HTMLAttributes['class']
  }>(),
  { layout: 'vertical', class: undefined },
)
</script>

<template>
  <div
    data-slot="visualization-card"
    :class="cn(gandalfVisualizationCardVariants({ layout }), props.class)"
  >
    <slot />
  </div>
</template>
