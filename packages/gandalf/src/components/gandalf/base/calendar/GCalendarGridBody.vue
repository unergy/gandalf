<script setup lang="ts">
import type { CalendarGridBodyProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { CalendarGridBody } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'

const props = defineProps<CalendarGridBodyProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <CalendarGridBody v-bind="delegatedProps" :class="cn(props.class)">
    <slot />
  </CalendarGridBody>
</template>
