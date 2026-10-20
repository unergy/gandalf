<script setup lang="ts">
import type { CalendarCellTriggerProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { CalendarCellTrigger } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'

const props = defineProps<CalendarCellTriggerProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <CalendarCellTrigger v-bind="delegatedProps" :class="cn(props.class)">
    <slot />
  </CalendarCellTrigger>
</template>
