<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { gandalfCardCheckGlyphClass } from './index'

// Figma: Check → Card Check. A selectable card with an optional icon, a label and a circle check.
const props = withDefaults(
  defineProps<{
    label: string
    description?: string
    /** Activated state ("State=Activated" in Figma). */
    modelValue?: boolean
    disabled?: boolean
    class?: HTMLAttributes['class']
  }>(),
  { description: undefined, modelValue: false, disabled: false, class: undefined },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()
</script>

<template>
  <button
    type="button"
    role="checkbox"
    data-slot="card-check"
    :data-state="modelValue ? 'on' : 'off'"
    :aria-checked="modelValue"
    :disabled="disabled"
    :class="
      cn(
        'group border-bni-border-loud text-base-foreground hover:overlay-dark-5 focus-visible:ring-ring active:overlay-dark-8 data-[state=on]:border-accent-primary-foreground data-[state=on]:bg-accent-primary data-[state=on]:text-accent-primary-foreground flex min-h-12 w-full cursor-pointer items-center gap-2 overflow-clip rounded-2xl border p-3 text-left outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0',
        props.class,
      )
    "
    @click="emit('update:modelValue', !modelValue)"
  >
    <slot name="icon" />
    <span class="flex min-w-0 flex-1 flex-col gap-0.5">
      <span class="text-base leading-[normal] font-semibold">{{ label }}</span>
      <span v-if="description" class="text-sm leading-[normal] opacity-80">{{ description }}</span>
    </span>
    <span :class="gandalfCardCheckGlyphClass" aria-hidden="true" />
  </button>
</template>
