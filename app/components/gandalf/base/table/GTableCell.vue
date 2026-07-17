<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { TableCell } from '@/components/ui/table'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <TableCell :class="cn(props.class)">
    <slot />
  </TableCell>
</template>
