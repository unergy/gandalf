<script setup lang="ts">
import { computed } from 'vue'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { Option } from '@/components/gandalf/base/types'
import {
  gandalfMenuContentVariants,
  gandalfMenuItemVariants,
  gandalfMenuLabelVariants,
  gandalfMenuSeparatorVariants,
} from '@/components/gandalf/base/menu'

const props = defineProps<{
  options: Option[]
  modelValue?: string | number
  label?: string
  disabled?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  select: [option: Option]
}>()

const selectedOption = computed(
  () => props.options.find((o) => o.value === props.modelValue) ?? null,
)

function handleSelect(option: Option) {
  if (option.disabled) return
  emit('update:modelValue', option.value)
  emit('select', option)
}
</script>

<template>
  <DropdownMenu v-slot="{ open }">
    <DropdownMenuTrigger :as-child="true" :disabled="disabled">
      <slot :open="open" :selected-option="selectedOption" />
    </DropdownMenuTrigger>
    <DropdownMenuContent :class="[gandalfMenuContentVariants(), 'p-3']">
      <template v-if="label">
        <DropdownMenuLabel :class="gandalfMenuLabelVariants()">{{ label }}</DropdownMenuLabel>
        <DropdownMenuSeparator :class="gandalfMenuSeparatorVariants()" />
      </template>
      <DropdownMenuItem
        v-for="option in options"
        :key="option.value"
        :disabled="option.disabled"
        :data-selected="option.value === modelValue"
        :class="[gandalfMenuItemVariants(), 'data-[selected=true]:font-semibold']"
        @click="handleSelect(option)"
      >
        <span
          v-if="option.color"
          class="size-2 shrink-0 rounded-full"
          :style="{ backgroundColor: option.color }"
        />
        {{ option.label }}
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
