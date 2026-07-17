<script setup lang="ts">
import type { TooltipRootEmits, TooltipRootProps } from 'reka-ui'
import { Tooltip } from '@/components/ui/tooltip'

const props = defineProps<TooltipRootProps>()
const emits = defineEmits<TooltipRootEmits>()
</script>

<template>
  <Tooltip v-slot="slotProps" v-bind="props" @update:open="emits('update:open', $event)">
    <slot v-bind="slotProps" />
  </Tooltip>
</template>
