<script setup lang="ts">
import type { PopoverRootEmits, PopoverRootProps } from 'reka-ui'
import { Popover } from '@/components/ui/popover'

// Boolean props default to undefined, not false: an absent `open` must leave the popover
// uncontrolled.
const props = withDefaults(defineProps<PopoverRootProps>(), {
  open: undefined,
  defaultOpen: undefined,
  modal: undefined,
})
const emits = defineEmits<PopoverRootEmits>()
</script>

<template>
  <Popover v-slot="slotProps" v-bind="props" @update:open="emits('update:open', $event)">
    <slot v-bind="slotProps" />
  </Popover>
</template>
