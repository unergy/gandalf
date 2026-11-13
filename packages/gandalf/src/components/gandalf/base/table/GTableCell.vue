<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { TableCell } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { gandalfTableCellVariants, gandalfTableDescriptionVariants } from './index'

const props = defineProps<{
  /** Second line (Figma: Text Configuration=Double). */
  description?: string
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <TableCell :class="cn(gandalfTableCellVariants(), props.class)">
    <span v-if="description || $slots.description" class="flex min-w-0 flex-col">
      <span class="block truncate"><slot /></span>
      <span :class="gandalfTableDescriptionVariants({ type: 'cell' })">
        <slot name="description">{{ description }}</slot>
      </span>
    </span>
    <slot v-else />
  </TableCell>
</template>
