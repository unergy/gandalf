<script setup lang="ts">
import type { RangeCalendarRootEmits, RangeCalendarRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { RangeCalendar } from '@/components/ui/range-calendar'
import { cn } from '@/lib/utils'

const props = defineProps<RangeCalendarRootProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<RangeCalendarRootEmits>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <RangeCalendar
    v-bind="delegatedProps"
    :class="cn(props.class)"
    @update:model-value="emits('update:modelValue', $event)"
    @update:valid-model-value="emits('update:validModelValue', $event)"
    @update:placeholder="emits('update:placeholder', $event)"
    @update:start-value="emits('update:startValue', $event)"
  >
    <slot />
  </RangeCalendar>
</template>
