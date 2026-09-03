<script setup lang="ts">
import type { CalendarNextProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { CalendarNextButton } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'

const props = defineProps<CalendarNextProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <CalendarNextButton v-bind="delegatedProps" :class="cn(props.class)">
    <slot />
  </CalendarNextButton>
</template>
