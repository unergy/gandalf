<script setup lang="ts">
import type { DialogRootEmits, DialogRootProps } from 'reka-ui'
import { Sheet } from '@/components/ui/sheet'

// Figma: Details Panel. The design shows the panel over the page without a scrim and with the rest
// of the screen still usable, so `modal` defaults to false.
const props = withDefaults(defineProps<DialogRootProps>(), {
  modal: false,
  open: undefined,
  defaultOpen: undefined,
  unmountOnHide: undefined,
})

const emits = defineEmits<DialogRootEmits>()
</script>

<template>
  <Sheet v-slot="slotProps" v-bind="props" @update:open="emits('update:open', $event)">
    <slot v-bind="slotProps" />
  </Sheet>
</template>
