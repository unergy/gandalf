<script setup lang="ts">
import type { CalendarHeadingProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { CalendarHeading } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'

const props = defineProps<CalendarHeadingProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <CalendarHeading v-slot="{ headingValue }" v-bind="delegatedProps" :class="cn(props.class)">
    <slot :heading-value="headingValue">{{ headingValue }}</slot>
  </CalendarHeading>
</template>
