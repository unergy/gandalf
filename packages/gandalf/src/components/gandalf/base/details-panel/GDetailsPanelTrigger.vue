<script setup lang="ts">
import type { DialogTriggerProps } from 'reka-ui'
import { SheetTrigger } from '@/components/ui/sheet'

const props = defineProps<DialogTriggerProps>()
</script>

<template>
  <SheetTrigger v-bind="props">
    <slot />
  </SheetTrigger>
</template>
