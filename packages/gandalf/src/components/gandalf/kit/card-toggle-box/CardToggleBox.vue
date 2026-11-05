<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { gandalfCardCheckGlyphClass } from '@/components/gandalf/kit/card-check'
import { cn } from '@/lib/utils'

// Figma: Check → Card Toggle Box. A 96px tile: circle check on the top right, icon and label at
// the bottom.
const props = withDefaults(
  defineProps<{
    label: string
    /** Activated state ("State=Activated" in Figma). */
    modelValue?: boolean
    disabled?: boolean
    class?: HTMLAttributes['class']
  }>(),
  { modelValue: false, disabled: false, class: undefined },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()
</script>

<template>
  <button
    type="button"
    role="checkbox"
    data-slot="card-toggle-box"
    :data-state="modelValue ? 'on' : 'off'"
    :aria-checked="modelValue"
    :disabled="disabled"
    :class="
      cn(
        'group border-bni-border-loud text-base-foreground hover:overlay-dark-5 focus-visible:ring-ring active:overlay-dark-8 data-[state=on]:border-accent-primary-foreground data-[state=on]:bg-accent-primary data-[state=on]:text-accent-primary-foreground flex h-24 w-full cursor-pointer items-start gap-1 overflow-clip rounded-2xl border p-3 text-left outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0',
        props.class,
      )
    "
    @click="emit('update:modelValue', !modelValue)"
  >
    <span class="flex h-full min-w-0 flex-1 items-end gap-2">
      <slot name="icon" />
      <span class="min-w-0 flex-1 truncate text-base leading-[normal] font-semibold">{{
        label
      }}</span>
    </span>
    <span :class="gandalfCardCheckGlyphClass" aria-hidden="true" />
  </button>
</template>
