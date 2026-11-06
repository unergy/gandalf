<script setup lang="ts">
import type { DialogCloseProps } from 'reka-ui'
import { SheetClose } from '@/components/ui/sheet'

const props = defineProps<DialogCloseProps>()
</script>

<template>
  <SheetClose v-bind="props">
    <slot />
  </SheetClose>
</template>
