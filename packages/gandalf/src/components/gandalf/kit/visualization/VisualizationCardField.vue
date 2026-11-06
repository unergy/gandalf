<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { gandalfVisualizationCardFieldVariants } from './index'

// Figma: Visualization → Visualization Card Field. A label and its value side by side, in two
// columns of the same width.
const props = withDefaults(
  defineProps<{
    label?: string
    /** Value text. Truncates after three lines, as the "Comment" field of the design. */
    value?: string | number
    /** Shown when `value` is empty ("Sin definir" in Figma), in base/foreground-extra-quiet. */
    placeholder?: string
    /** "Divider=Yes" in Figma. Inside GVisualizationCard the card draws the dividers. */
    divider?: boolean
    class?: HTMLAttributes['class']
  }>(),
  { label: undefined, value: undefined, placeholder: undefined, divider: false, class: undefined },
)
</script>

<template>
  <div
    data-slot="visualization-card-field"
    :class="cn(gandalfVisualizationCardFieldVariants({ divider }), props.class)"
  >
    <div
      class="text-base-foreground-quiet flex max-h-[67px] min-h-10 items-center gap-2 self-stretch overflow-hidden py-2 text-sm leading-[normal] [&_svg]:size-3.5 [&_svg]:shrink-0"
    >
      <slot name="icon" />
      <span class="truncate">
        <slot name="label">{{ label }}</slot>
      </span>
    </div>
    <div class="flex max-h-[67px] min-h-10 items-center gap-2 self-start py-2">
      <span
        v-if="value !== undefined && value !== ''"
        class="text-base-foreground-loud line-clamp-3 min-w-0 flex-1 text-sm leading-[normal]"
      >
        {{ value }}
      </span>
      <span
        v-else-if="placeholder"
        class="text-base-foreground-extra-quiet min-w-0 flex-1 truncate text-sm leading-[normal]"
      >
        {{ placeholder }}
      </span>
      <slot />
    </div>
  </div>
</template>
