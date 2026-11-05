<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Star } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import { gandalfStarVariants } from './index'

const props = withDefaults(
  defineProps<{
    /** Activated state ("State=Activated" in Figma). */
    modelValue?: boolean
    size?: 'md' | 'sm'
    /** Accessible name; the button only shows an icon. */
    label?: string
    disabled?: boolean
    class?: HTMLAttributes['class']
  }>(),
  { modelValue: false, size: 'md', label: 'Favorite', disabled: false, class: undefined },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()
</script>

<template>
  <button
    type="button"
    data-slot="star"
    :data-state="modelValue ? 'on' : 'off'"
    :aria-pressed="modelValue"
    :aria-label="label"
    :disabled="disabled"
    :class="cn(gandalfStarVariants({ size }), props.class)"
    @click="emit('update:modelValue', !modelValue)"
  >
    <Star :stroke-width="2" />
  </button>
</template>
