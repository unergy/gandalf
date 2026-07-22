<script setup lang="ts">
import type { TooltipRootEmits, TooltipRootProps } from 'reka-ui'
import { TooltipRoot, useForwardPropsEmits } from 'reka-ui'

const props = defineProps<TooltipRootProps>()
const emits = defineEmits<TooltipRootEmits>()

</script>

<template>
  <TooltipRoot v-slot="slotProps">
    <slot v-bind="slotProps" />
  </TooltipRoot>
</template>
