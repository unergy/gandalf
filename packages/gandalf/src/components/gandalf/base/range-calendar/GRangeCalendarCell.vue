<script setup lang="ts">
import type { RangeCalendarCellProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { RangeCalendarCell } from '@/components/ui/range-calendar'
import { cn } from '@/lib/utils'

const props = defineProps<RangeCalendarCellProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <RangeCalendarCell v-bind="delegatedProps" :class="cn(props.class)">
    <slot />
  </RangeCalendarCell>
</template>
