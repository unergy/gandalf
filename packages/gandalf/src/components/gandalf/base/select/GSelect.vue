<script setup lang="ts">
import type { SelectRootEmits, SelectRootProps } from 'reka-ui'
import { Select } from '@/components/ui/select'

// Boolean props default to undefined, not false: an absent `open` must leave the select
// uncontrolled.
const props = withDefaults(defineProps<SelectRootProps>(), {
  open: undefined,
  defaultOpen: undefined,
  multiple: undefined,
  disabled: undefined,
  required: undefined,
})
const emits = defineEmits<SelectRootEmits>()
</script>

<template>
  <Select
    v-slot="slotProps"
    v-bind="props"
    @update:model-value="emits('update:modelValue', $event)"
    @update:open="emits('update:open', $event)"
  >
    <slot v-bind="slotProps" />
  </Select>
</template>
