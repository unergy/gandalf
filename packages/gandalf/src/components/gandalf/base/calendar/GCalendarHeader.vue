<script setup lang="ts">
import type { CalendarHeaderProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { CalendarHeader } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'

const props = defineProps<CalendarHeaderProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <CalendarHeader v-bind="delegatedProps" :class="cn(props.class)">
    <slot />
  </CalendarHeader>
</template>
