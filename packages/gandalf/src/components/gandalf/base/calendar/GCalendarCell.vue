<script setup lang="ts">
import type { CalendarCellProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { CalendarCell } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'

const props = defineProps<CalendarCellProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <CalendarCell v-bind="delegatedProps" :class="cn(props.class)">
    <slot />
  </CalendarCell>
</template>
