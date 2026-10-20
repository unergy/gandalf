<script setup lang="ts">
import type { CalendarGridRowProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { CalendarGridRow } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'

const props = defineProps<CalendarGridRowProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <CalendarGridRow v-bind="delegatedProps" :class="cn(props.class)">
    <slot />
  </CalendarGridRow>
</template>
