<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { GandalfInputSize } from '@/components/gandalf/base/input'
import { reactiveOmit } from '@vueuse/core'
import { gandalfInputVariants } from '@/components/gandalf/base/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
  defaultValue?: string | number
  modelValue?: string | number
  /** Text size, as Figma's Text Area: xs 12px, sm 14px, md 16px. */
  size?: GandalfInputSize
}>()

defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const delegatedProps = reactiveOmit(props, 'class', 'size')
</script>

<template>
  <!-- Figma: Input → Text Area. Input Field states; 72px minimum height and 12px padding at every size -->
  <Textarea
    v-bind="delegatedProps"
    :class="cn(gandalfInputVariants({ size }), 'h-auto min-h-18 p-3', props.class)"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>
