<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { TableHeader } from '@/components/ui/table'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <TableHeader :class="cn(props.class)">
    <slot />
  </TableHeader>
</template>
