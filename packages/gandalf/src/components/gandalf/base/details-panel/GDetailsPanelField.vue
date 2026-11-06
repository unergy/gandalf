<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import {
  gandalfDetailsPanelFieldLabelVariants,
  gandalfDetailsPanelFieldTextVariants,
  gandalfDetailsPanelFieldValueVariants,
  gandalfDetailsPanelFieldVariants,
} from './index'

// Figma: Visualization → "Visualization Card Field", the row used throughout the Details Panel.
// Label on the left, value (text, badge or avatar) on the right, and the optional Divider=Yes line.
const props = withDefaults(
  defineProps<{
    label?: string
    value?: string | number | null
    /** Text for the empty state ("Sin definir" in Figma), in base/foreground-extra-quiet. */
    placeholder?: string
    /** "Divider=Yes" in Figma: a bni/border line under the row. */
    divider?: boolean
    class?: HTMLAttributes['class']
    labelClass?: HTMLAttributes['class']
    valueClass?: HTMLAttributes['class']
  }>(),
  {
    label: undefined,
    value: undefined,
    placeholder: undefined,
    divider: false,
    class: undefined,
    labelClass: undefined,
    valueClass: undefined,
  },
)

const isEmpty = computed(
  () => props.value === undefined || props.value === null || props.value === '',
)
const text = computed(() => (isEmpty.value ? props.placeholder : String(props.value)))
</script>

<template>
  <div
    data-slot="details-panel-field"
    :class="cn(gandalfDetailsPanelFieldVariants({ divider }), props.class)"
  >
    <div
      data-slot="details-panel-field-label"
      :class="cn(gandalfDetailsPanelFieldLabelVariants(), props.labelClass)"
    >
      <slot name="icon" />
      <slot name="label">{{ label }}</slot>
    </div>
    <div
      data-slot="details-panel-field-value"
      :class="cn(gandalfDetailsPanelFieldValueVariants(), props.valueClass)"
    >
      <slot name="value">
        <span
          v-if="text !== undefined"
          :class="gandalfDetailsPanelFieldTextVariants({ placeholder: isEmpty })"
          >{{ text }}</span
        >
      </slot>
    </div>
  </div>
</template>
