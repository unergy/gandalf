<script setup lang="ts">
import type { RangeCalendarGridProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { RangeCalendarGrid } from '@/components/ui/range-calendar'
import { cn } from '@/lib/utils'

const props = defineProps<RangeCalendarGridProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <RangeCalendarGrid v-bind="delegatedProps" :class="cn(props.class)">
    <slot />
  </RangeCalendarGrid>
</template>
