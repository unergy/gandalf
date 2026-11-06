<script setup lang="ts">
import type { RangeCalendarCellTriggerProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { RangeCalendarCellTrigger } from '@/components/ui/range-calendar'
import { cn } from '@/lib/utils'

const props = defineProps<RangeCalendarCellTriggerProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <RangeCalendarCellTrigger v-bind="delegatedProps" :class="cn(props.class)">
    <slot />
  </RangeCalendarCellTrigger>
</template>
