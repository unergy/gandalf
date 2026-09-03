<script setup lang="ts">
import type { CalendarPrevProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { CalendarPrevButton } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'

const props = defineProps<CalendarPrevProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <CalendarPrevButton v-bind="delegatedProps" :class="cn(props.class)">
    <slot />
  </CalendarPrevButton>
</template>
