<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import Icons from './Icons.vue'
import { gandalfPickerItemVariants } from './index'
import type { GandalfIconsType, GandalfPickerItemType } from './index'

const props = withDefaults(
  defineProps<{
    type?: GandalfPickerItemType
    /** Activated state ("State=Activated" in Figma). */
    modelValue?: boolean
    /** Type=Icon: the Icons drawing shown. */
    icon?: GandalfIconsType
    /** Type=Label: the text ("##" in Figma). */
    label?: string
    showLabel?: boolean
    /** Type=Label: the color sample circle ("Opacity" in Figma). */
    showOpacity?: boolean
    /** Type=Label: the line sample ("Thickness" in Figma). */
    showThickness?: boolean
    /** Color of the sample circle, #BABBBD in Figma. */
    color?: string
    /** Height of the sample line in px, 3 in Figma. */
    thickness?: number
    /** Accessible name for Type=Icon, which only shows a drawing. */
    ariaLabel?: string
    disabled?: boolean
    class?: HTMLAttributes['class']
  }>(),
  {
    type: 'icon',
    modelValue: false,
    icon: 'tree',
    label: undefined,
    showLabel: true,
    showOpacity: true,
    showThickness: true,
    color: '#BABBBD',
    thickness: 3,
    ariaLabel: undefined,
    disabled: false,
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
    data-slot="picker-item"
    :data-type="type"
    :data-state="modelValue ? 'on' : 'off'"
    :aria-pressed="modelValue"
    :aria-label="ariaLabel"
    :disabled="disabled"
    :class="cn(gandalfPickerItemVariants({ type }), props.class)"
    @click="emit('update:modelValue', !modelValue)"
  >
    <slot>
      <Icons v-if="type === 'icon'" :type="icon" class="w-full" />
      <template v-else>
        <span
          v-if="showThickness"
          class="w-[18px] shrink-0 bg-slate-800"
          :style="{ height: `${thickness}px` }"
        />
        <span
          v-if="showOpacity"
          class="size-[22px] shrink-0 rounded-full"
          :style="{ backgroundColor: color }"
        />
        <span v-if="showLabel" class="text-body-sm text-base-foreground truncate">
          <slot name="label">{{ label }}</slot>
        </span>
      </template>
    </slot>
  </button>
</template>
