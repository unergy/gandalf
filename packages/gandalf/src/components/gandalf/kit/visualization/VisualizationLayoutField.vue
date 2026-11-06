<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { gandalfVisualizationLayoutFieldVariants } from './index'

// Figma: Visualization → Visualization Layout Field. A label on top and its value below, meant to
// sit in a row of columns inside GVisualizationLayoutCard.
const props = withDefaults(
  defineProps<{
    label?: string
    value?: string | number
    /** "Divider=Yes" in Figma. Inside GVisualizationLayoutCard the card draws the dividers. */
    divider?: boolean
    class?: HTMLAttributes['class']
  }>(),
  { label: undefined, value: undefined, divider: false, class: undefined },
)
</script>

<template>
  <div
    data-slot="visualization-layout-field"
    :class="cn(gandalfVisualizationLayoutFieldVariants({ divider }), props.class)"
  >
    <div class="flex h-14 min-w-0 flex-1 flex-col items-start justify-between overflow-hidden">
      <div
        class="text-base-foreground-quiet flex w-full items-center gap-2 text-sm leading-[normal] [&_svg]:size-3.5 [&_svg]:shrink-0"
      >
        <slot name="icon" />
        <span class="min-w-0 flex-1 truncate">
          <slot name="label">{{ label }}</slot>
        </span>
      </div>
      <div class="flex h-8 w-full items-center">
        <span
          v-if="value !== undefined"
          class="text-base-foreground-loud min-w-0 flex-1 truncate px-1 text-base leading-normal"
        >
          {{ value }}
        </span>
        <slot />
      </div>
    </div>
  </div>
</template>
