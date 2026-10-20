<script setup lang="ts">
import type { CalendarGridProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { CalendarGrid } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'

const props = defineProps<CalendarGridProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <CalendarGrid v-bind="delegatedProps" :class="cn(props.class)">
    <slot />
  </CalendarGrid>
</template>
