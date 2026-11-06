<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { GandalfVisualizationCardLayout } from './index'
import { cn } from '@/lib/utils'
import { gandalfVisualizationCardTitleVariants, gandalfVisualizationCardVariants } from './index'

// Figma: Visualization → Visualization Card Vertical / Horizontal. Holds GVisualizationCardField
// rows and draws the divider on every row but the last one.
const props = withDefaults(
  defineProps<{
    /** "Vertical" is one field per row; "horizontal" lays them out in two columns. */
    layout?: GandalfVisualizationCardLayout
    /** Group title above the rows, as the panels of Figma's Details Panel. Also a `title` slot. */
    title?: string
    class?: HTMLAttributes['class']
  }>(),
  { layout: 'vertical', title: undefined, class: undefined },
)
</script>

<template>
  <div
    data-slot="visualization-card"
    :class="cn(gandalfVisualizationCardVariants({ layout }), props.class)"
  >
    <div
      v-if="title || $slots.title"
      data-slot="visualization-card-title"
      :class="gandalfVisualizationCardTitleVariants()"
    >
      <slot name="title">{{ title }}</slot>
    </div>
    <slot />
  </div>
</template>
