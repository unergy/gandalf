<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { TableHead } from '@/components/ui/table'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <TableHead :class="cn(props.class)">
    <slot />
  </TableHead>
</template>
