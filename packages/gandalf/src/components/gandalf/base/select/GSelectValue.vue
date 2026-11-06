<script setup lang="ts">
import type { SelectValueProps } from 'reka-ui'
import { SelectValue } from '@/components/ui/select'

const props = defineProps<SelectValueProps>()
</script>

<template>
  <SelectValue v-bind="props">
    <slot />
  </SelectValue>
</template>
