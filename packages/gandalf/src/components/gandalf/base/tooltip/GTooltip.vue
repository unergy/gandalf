<script setup lang="ts">
import type { TooltipRootEmits, TooltipRootProps } from 'reka-ui'
import { Tooltip } from '@/components/ui/tooltip'

// Boolean props default to undefined, not false: an absent `open` must leave the tooltip
// uncontrolled.
const props = withDefaults(defineProps<TooltipRootProps>(), {
  open: undefined,
  defaultOpen: undefined,
  disabled: undefined,
  disableClosingTrigger: undefined,
  disableHoverableContent: undefined,
  ignoreNonKeyboardFocus: undefined,
})
const emit = defineEmits<TooltipRootEmits>()
</script>

<template>
  <Tooltip v-slot="slotProps" v-bind="props" @update:open="emit('update:open', $event)">
    <slot v-bind="slotProps" />
  </Tooltip>
</template>
