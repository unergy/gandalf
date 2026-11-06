<script setup lang="ts">
import type { RangeCalendarGridBodyProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { RangeCalendarGridBody } from '@/components/ui/range-calendar'
import { cn } from '@/lib/utils'

const props = defineProps<RangeCalendarGridBodyProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <RangeCalendarGridBody v-bind="delegatedProps" :class="cn(props.class)">
    <slot />
  </RangeCalendarGridBody>
</template>
