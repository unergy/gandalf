<script setup lang="ts">
import type { AlertDialogEmits, AlertDialogProps } from 'reka-ui'
import { AlertDialog } from '@/components/ui/alert-dialog'

// Boolean props default to undefined, not false: an absent `open` must leave the dialog
// uncontrolled.
const props = withDefaults(defineProps<AlertDialogProps>(), {
  open: undefined,
  defaultOpen: undefined,
})
const emits = defineEmits<AlertDialogEmits>()
</script>

<template>
  <AlertDialog v-bind="props" @update:open="emits('update:open', $event)">
    <slot />
  </AlertDialog>
</template>
