<script setup lang="ts">
import type { DialogCloseProps } from 'reka-ui'
import { DialogClose } from '@/components/ui/dialog'

const props = defineProps<DialogCloseProps>()
</script>

<template>
  <DialogClose v-bind="props">
    <slot />
  </DialogClose>
</template>
