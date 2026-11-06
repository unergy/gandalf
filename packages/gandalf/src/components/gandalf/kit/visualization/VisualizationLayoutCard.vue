<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { GandalfVisualizationLayoutCardColumns } from './index'
import { cn } from '@/lib/utils'
import {
  gandalfVisualizationLayoutCardItemsVariants,
  gandalfVisualizationLayoutCardVariants,
} from './index'

// Figma: Visualization → Visualization Layout Item. A white card whose header is an accordion in the
// design, with a row of GVisualizationLayoutField below.
const props = withDefaults(
  defineProps<{
    /** Fields per row. Every field but the last of each row shows its vertical rule. */
    columns?: GandalfVisualizationLayoutCardColumns
    class?: HTMLAttributes['class']
    itemsClass?: HTMLAttributes['class']
  }>(),
  { columns: 4, class: undefined, itemsClass: undefined },
)
</script>

<template>
  <div
    data-slot="visualization-layout-card"
    :class="cn(gandalfVisualizationLayoutCardVariants(), props.class)"
  >
    <slot name="header" />
    <div :class="cn(gandalfVisualizationLayoutCardItemsVariants({ columns }), props.itemsClass)">
      <slot />
    </div>
  </div>
</template>
