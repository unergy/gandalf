<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

// Figma: Card → Miniature. A selectable 128px thumbnail.
const props = withDefaults(
  defineProps<{
    src?: string
    alt?: string
    /** Activated state ("Property 1=Activated" in Figma). */
    modelValue?: boolean
    class?: HTMLAttributes['class']
  }>(),
  {
    src: undefined,
    alt: '',
    modelValue: false,
    class: undefined,
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()
</script>

<template>
  <button
    type="button"
    data-slot="miniature"
    :data-state="modelValue ? 'on' : 'off'"
    :aria-pressed="modelValue"
    :class="
      cn(
        'group hover:bg-base-loud focus-visible:ring-ring flex size-32 shrink-0 cursor-pointer items-center justify-center rounded-2xl outline-none focus-visible:ring-2 data-[state=on]:hover:bg-transparent',
        props.class,
      )
    "
    @click="emit('update:modelValue', !modelValue)"
  >
    <!-- Activated shrinks the frame to 104px and draws a 4px border inside the same 128px slot -->
    <span
      class="group-data-[state=on]:border-accent-primary-foreground group-data-[state=on]:bg-accent-primary flex size-full items-center rounded-2xl p-2 group-data-[state=on]:size-26 group-data-[state=on]:border-4"
    >
      <span
        class="bg-base-inverse size-full overflow-hidden rounded-xl group-data-[state=on]:rounded-lg [&_img]:size-full [&_img]:object-cover"
      >
        <slot>
          <img v-if="src" :src="src" :alt="alt" />
        </slot>
      </span>
    </span>
  </button>
</template>
