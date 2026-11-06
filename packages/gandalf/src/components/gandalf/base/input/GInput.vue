<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { GandalfInputSize } from './index'
import { reactiveOmit } from '@vueuse/core'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import {
  gandalfFieldWithinClass,
  gandalfInputFieldInputClass,
  gandalfInputFieldVariants,
  gandalfInputVariants,
} from './index'

// Native attributes (id, name, placeholder, disabled, aria-*) always go to the <input>, also when
// the icons wrap it in a div.
defineOptions({ inheritAttrs: false })

const props = defineProps<{
  class?: HTMLAttributes['class']
  defaultValue?: string | number
  modelValue?: string | number
  size?: GandalfInputSize
}>()

defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

defineSlots<{
  /** Icon before the text ("Leading icon" in Figma). */
  leading?: () => unknown
  /** Icon after the text ("Trailing icon" in Figma). */
  trailing?: () => unknown
}>()

const delegatedProps = reactiveOmit(props, 'class', 'size')
</script>

<template>
  <div
    v-if="$slots.leading || $slots.trailing"
    data-slot="input-field"
    :class="cn(gandalfFieldWithinClass, gandalfInputFieldVariants({ size }), props.class)"
  >
    <slot name="leading" />
    <Input
      v-bind="{ ...$attrs, ...delegatedProps }"
      :class="gandalfInputFieldInputClass"
      @update:model-value="$emit('update:modelValue', $event)"
    />
    <slot name="trailing" />
  </div>
  <Input
    v-else
    v-bind="{ ...$attrs, ...delegatedProps }"
    :data-size="size ?? 'md'"
    :class="cn(gandalfInputVariants({ size }), props.class)"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>
