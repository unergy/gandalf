<script setup lang="ts">
import type { DialogRootEmits, DialogRootProps } from 'reka-ui'
import { Dialog } from '@/components/ui/dialog'

// Boolean props default to undefined, not false: an absent `open` must leave the dialog
// uncontrolled, and an absent `modal` must keep Reka's default (modal, with its overlay).
const props = withDefaults(defineProps<DialogRootProps>(), {
  open: undefined,
  defaultOpen: undefined,
  modal: undefined,
})
const emits = defineEmits<DialogRootEmits>()
</script>

<template>
  <Dialog v-bind="props" @update:open="emits('update:open', $event)">
    <slot />
  </Dialog>
</template>
