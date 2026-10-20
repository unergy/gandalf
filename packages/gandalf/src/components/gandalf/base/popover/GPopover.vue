<script setup lang="ts">
import type { PopoverRootEmits, PopoverRootProps } from 'reka-ui'
import { Popover } from '@/components/ui/popover'

const props = defineProps<PopoverRootProps>()
const emits = defineEmits<PopoverRootEmits>()
</script>

<template>
  <Popover v-slot="slotProps" v-bind="props" @update:open="emits('update:open', $event)">
    <slot v-bind="slotProps" />
  </Popover>
</template>
