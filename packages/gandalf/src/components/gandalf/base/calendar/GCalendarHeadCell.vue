<script setup lang="ts">
import type { CalendarHeadCellProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { CalendarHeadCell } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'

const props = defineProps<CalendarHeadCellProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <CalendarHeadCell v-bind="delegatedProps" :class="cn(props.class)">
    <slot />
  </CalendarHeadCell>
</template>
