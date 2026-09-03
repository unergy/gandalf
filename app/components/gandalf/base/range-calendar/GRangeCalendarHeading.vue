<script setup lang="ts">
import type { RangeCalendarHeadingProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { RangeCalendarHeading } from '@/components/ui/range-calendar'
import { cn } from '@/lib/utils'

const props = defineProps<RangeCalendarHeadingProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <RangeCalendarHeading v-slot="{ headingValue }" v-bind="delegatedProps" :class="cn(props.class)">
    <slot :heading-value="headingValue">{{ headingValue }}</slot>
  </RangeCalendarHeading>
</template>
