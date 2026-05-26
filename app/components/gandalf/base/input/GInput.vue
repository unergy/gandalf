<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { type GandalfInputVariants, gandalfInputVariants } from '.'

const props = defineProps<{
  modelValue?: string | number
  defaultValue?: string | number
  type?: HTMLInputElement['type']
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  size?: GandalfInputVariants['size']
  class?: HTMLAttributes['class']
}>()

defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

const delegatedProps = reactiveOmit(props, 'class', 'size')
</script>

<template>
  <Input
    v-bind="delegatedProps"
    :class="cn(gandalfInputVariants({ size }), props.class)"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>
