<script setup lang="ts">
import type { CalendarRootEmits, CalendarRootProps, DateValue } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { LayoutTypes } from '@/components/ui/calendar'
import { reactiveOmit } from '@vueuse/core'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'

const props = defineProps<
  CalendarRootProps & {
    class?: HTMLAttributes['class']
    /** Swaps the static heading for month and/or year dropdowns. */
    layout?: LayoutTypes
    /** The years the year dropdown offers. Defaults to 100 back and 10 forward. */
    yearRange?: DateValue[]
  }
>()
const emits = defineEmits<CalendarRootEmits>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <Calendar
    v-bind="delegatedProps"
    :class="cn(props.class)"
    @update:model-value="emits('update:modelValue', $event)"
    @update:placeholder="emits('update:placeholder', $event)"
  >
    <template #calendar-heading="slotProps">
      <slot name="calendar-heading" v-bind="slotProps" />
    </template>
    <template #calendar-prev-icon><slot name="calendar-prev-icon" /></template>
    <template #calendar-next-icon><slot name="calendar-next-icon" /></template>
  </Calendar>
</template>
