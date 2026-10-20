<script setup lang="ts">
import type { SelectRootEmits, SelectRootProps } from 'reka-ui'
import { Select } from '@/components/ui/select'

const props = defineProps<SelectRootProps>()
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
