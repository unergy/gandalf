<script setup lang="ts">
import type { RangeCalendarGridHeadProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { RangeCalendarGridHead } from '@/components/ui/range-calendar'
import { cn } from '@/lib/utils'

const props = defineProps<RangeCalendarGridHeadProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <RangeCalendarGridHead v-bind="delegatedProps" :class="cn(props.class)">
    <slot />
  </RangeCalendarGridHead>
</template>
