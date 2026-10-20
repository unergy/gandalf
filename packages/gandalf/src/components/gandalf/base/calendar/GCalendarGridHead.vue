<script setup lang="ts">
import type { CalendarGridHeadProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { CalendarGridHead } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'

const props = defineProps<CalendarGridHeadProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <CalendarGridHead v-bind="delegatedProps" :class="cn(props.class)">
    <slot />
  </CalendarGridHead>
</template>
