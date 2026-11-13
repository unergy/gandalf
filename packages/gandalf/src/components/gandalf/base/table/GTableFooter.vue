<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { TableFooter } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { gandalfTableFooterVariants } from './index'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <TableFooter :class="cn(gandalfTableFooterVariants(), props.class)">
    <slot />
  </TableFooter>
</template>
