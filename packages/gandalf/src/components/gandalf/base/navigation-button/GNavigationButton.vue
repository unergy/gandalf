<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { GandalfNavigationButtonColor } from './index'
import type { NavigationOption, NavigationOptionGroup, NavigationOptions } from './types'
import { computed } from 'vue'
import { Check, ChevronDown } from 'lucide-vue-next'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  gandalfMenuContentVariants,
  gandalfMenuItemVariants,
  gandalfMenuSeparatorVariants,
} from '@/components/gandalf/base/menu'
import { cn } from '@/lib/utils'
import { gandalfNavigationButtonVariants } from './index'

const props = withDefaults(
  defineProps<{
    options: NavigationOptions
    modelValue?: string | number
    /** Text when nothing is selected. */
    placeholder?: string
    /** Tints the trigger text with a semantic color. */
    color?: GandalfNavigationButtonColor
    disabled?: boolean
    class?: HTMLAttributes['class']
  }>(),
  {
    modelValue: undefined,
    placeholder: 'Select',
    color: 'default',
    disabled: false,
    class: undefined,
  },
)

const open = defineModel<boolean>('open', { default: false })

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
  (e: 'select', option: NavigationOption): void
}>()

// A flat list is one unlabelled group, so the template only handles groups.
const groups = computed<NavigationOptionGroup[]>(() => {
  const first = props.options[0]
  if (first === undefined) return []
  return 'options' in first
    ? (props.options as NavigationOptionGroup[])
    : [{ options: props.options as NavigationOption[] }]
})

const selected = computed(() =>
  groups.value
    .flatMap((group) => group.options)
    .find((option) => option.value === props.modelValue),
)

function handleSelect(option: NavigationOption) {
  emit('update:modelValue', option.value)
  emit('select', option)
}
</script>

<template>
  <DropdownMenu v-model:open="open">
    <DropdownMenuTrigger as-child :disabled="disabled">
      <button
        type="button"
        data-slot="navigation-button"
        :class="cn(gandalfNavigationButtonVariants({ color }), props.class)"
      >
        <span class="flex min-w-0 flex-1 items-center gap-2">
          <slot name="icon" />
          <span class="flex min-w-0 flex-1 flex-col">
            <span class="truncate text-base leading-normal font-semibold">
              {{ selected?.label ?? placeholder }}
            </span>
            <span
              v-if="selected?.description"
              class="text-base-foreground-quiet truncate text-sm leading-[normal]"
            >
              {{ selected.description }}
            </span>
          </span>
        </span>
        <ChevronDown />
      </button>
    </DropdownMenuTrigger>

    <DropdownMenuContent
      align="end"
      :class="[gandalfMenuContentVariants(), 'min-w-(--reka-dropdown-menu-trigger-width) p-3']"
    >
      <template v-for="(group, index) in groups" :key="index">
        <DropdownMenuSeparator v-if="index > 0" :class="gandalfMenuSeparatorVariants()" />
        <!-- Figma's Menu Item Description: title and description, a check on the current level -->
        <DropdownMenuItem
          v-for="option in group.options"
          :key="option.value"
          :disabled="option.disabled"
          :class="[gandalfMenuItemVariants(), 'gap-2 pt-1 pb-1.5']"
          @select="handleSelect(option)"
        >
          <span class="flex min-w-0 flex-1 flex-col gap-0.5">
            <span class="text-base leading-normal font-semibold">{{ option.label }}</span>
            <span v-if="option.description" class="truncate text-sm leading-[normal]">
              {{ option.description }}
            </span>
          </span>
          <Check v-if="option.value === modelValue" />
        </DropdownMenuItem>
      </template>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
