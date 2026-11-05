<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { GandalfCardToggleColor, GandalfCardToggleType } from './index'
import { cn } from '@/lib/utils'
import { gandalfCardToggleAvatarVariants, gandalfCardToggleVariants } from './index'

const props = withDefaults(
  defineProps<{
    title: string
    description?: string
    type?: GandalfCardToggleType
    color?: GandalfCardToggleColor
    /** Activated state ("Activated?" in Figma). */
    modelValue?: boolean
    class?: HTMLAttributes['class']
  }>(),
  {
    description: undefined,
    type: 'doble',
    color: 'default',
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
    data-slot="card-toggle"
    :data-state="modelValue ? 'on' : 'off'"
    :aria-pressed="modelValue"
    :class="cn(gandalfCardToggleVariants({ type }), props.class)"
    @click="emit('update:modelValue', !modelValue)"
  >
    <!-- Figma's "Opacity" layer: darkens the whole surface on hover and press -->
    <span
      class="group-hover:bg-alpha-dark-5 group-active:bg-alpha-dark-8 flex h-full min-w-0 flex-1 items-center gap-2 pl-2"
    >
      <span v-if="$slots.avatar" :class="gandalfCardToggleAvatarVariants({ type, color })">
        <slot name="avatar" />
      </span>

      <span
        v-if="type === 'report'"
        class="text-base-foreground min-w-0 flex-1 truncate text-base leading-normal font-semibold"
      >
        {{ title }}
      </span>
      <span v-else class="flex min-w-0 flex-1 flex-col pb-1">
        <span class="text-base-foreground-loud truncate text-base leading-normal font-semibold">
          {{ title }}
        </span>
        <span v-if="description" class="text-base-foreground-quiet truncate text-sm leading-[normal]">
          {{ description }}
        </span>
      </span>

      <span
        v-if="$slots.complementary"
        class="text-base-foreground-extra-quiet group-data-[state=on]:text-base-foreground-quiet flex shrink-0 items-center gap-1 pr-3 text-base leading-normal [&_svg]:size-4"
      >
        <slot name="complementary" />
      </span>
    </span>
  </button>
</template>
