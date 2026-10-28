<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { GandalfInputSize } from './index'
import { reactiveOmit } from '@vueuse/core'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { gandalfInputVariants } from './index'

const props = defineProps<{
  class?: HTMLAttributes['class']
  defaultValue?: string | number
  modelValue?: string | number
  size?: GandalfInputSize
}>()

defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const delegatedProps = reactiveOmit(props, 'class', 'size')
</script>

<template>
  <Input
    v-bind="delegatedProps"
    :data-size="size ?? 'default'"
    :class="cn(gandalfInputVariants({ size }), props.class)"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>
