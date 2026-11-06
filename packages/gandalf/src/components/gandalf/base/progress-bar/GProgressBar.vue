<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import {
  gandalfProgressBarLabelVariants,
  gandalfProgressBarValueLabel,
  gandalfProgressBarVariants,
} from './index'

const props = withDefaults(
  defineProps<{
    /** Progress, from 0 to `max`. Figma's States (Zero / Low / Middle / Long / Completed). */
    modelValue?: number
    max?: number
    /** Replaces the percentage shown next to the bar. */
    label?: string
    showLabel?: boolean
    class?: HTMLAttributes['class']
    trackClass?: HTMLAttributes['class']
    labelClass?: HTMLAttributes['class']
  }>(),
  {
    modelValue: 0,
    max: 100,
    label: undefined,
    showLabel: true,
    class: undefined,
    trackClass: undefined,
    labelClass: undefined,
  },
)

// ui/progress moves its indicator with `translateX(-(100 - modelValue)%)`, so it always reads
// the value as a percentage and ignores `max`. Normalize here before handing it over.
const percent = computed(() => {
  const max = props.max > 0 ? props.max : 100
  const value = Number.isFinite(props.modelValue) ? props.modelValue : 0
  return Math.min(100, Math.max(0, (value / max) * 100))
})

const text = computed(() => props.label ?? gandalfProgressBarValueLabel(percent.value))
</script>

<template>
  <div :class="cn('flex w-full items-center gap-2', props.class)">
    <Progress :model-value="percent" :class="cn(gandalfProgressBarVariants(), props.trackClass)" />
    <span v-if="showLabel" :class="cn(gandalfProgressBarLabelVariants(), props.labelClass)">
      <slot name="label">{{ text }}</slot>
    </span>
  </div>
</template>
