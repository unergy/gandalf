<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { TableHead } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { gandalfTableDescriptionVariants, gandalfTableHeadVariants } from './index'

const props = defineProps<{
  /** Second line (Figma: Text Configuration=Double). */
  description?: string
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <TableHead :class="cn(gandalfTableHeadVariants(), props.class)">
    <div v-if="description || $slots.description || $slots.action" class="flex items-center gap-2">
      <span class="flex min-w-0 flex-1 flex-col gap-0.5">
        <span class="block truncate"><slot /></span>
        <span
          v-if="description || $slots.description"
          :class="gandalfTableDescriptionVariants({ type: 'header' })"
        >
          <slot name="description">{{ description }}</slot>
        </span>
      </span>
      <span
        v-if="$slots.action"
        class="flex shrink-0 opacity-0 transition-opacity group-hover/table-head:opacity-100 focus-within:opacity-100"
      >
        <slot name="action" />
      </span>
    </div>
    <slot v-else />
  </TableHead>
</template>
