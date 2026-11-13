<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { circleReportIcons, gandalfCircleReportVariants } from './index'
import type { GandalfCircleReportType } from './index'

const props = withDefaults(
  defineProps<{
    type?: GandalfCircleReportType
    /** Accessible name; without it the circle is decorative. */
    label?: string
    class?: HTMLAttributes['class']
  }>(),
  { type: 'access', label: undefined, class: undefined },
)
</script>

<template>
  <span
    data-slot="circle-report"
    :data-type="type"
    :role="label ? 'img' : undefined"
    :aria-label="label"
    :aria-hidden="label ? undefined : 'true'"
    :class="cn(gandalfCircleReportVariants({ type }), props.class)"
  >
    <component :is="circleReportIcons[type]" />
  </span>
</template>
