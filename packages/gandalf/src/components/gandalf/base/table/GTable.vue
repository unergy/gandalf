<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Table } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { gandalfTableFooterBarVariants, gandalfTableVariants } from './index'

const props = defineProps<{
  class?: HTMLAttributes['class']
  /** Classes for the bordered frame around the table and its footer. */
  containerClass?: HTMLAttributes['class']
}>()
</script>

<template>
  <div :class="cn(gandalfTableVariants(), props.containerClass)">
    <Table :class="cn(props.class)">
      <slot />
    </Table>
    <div v-if="$slots.footer" data-slot="table-footer-bar" :class="gandalfTableFooterBarVariants()">
      <slot name="footer" />
    </div>
  </div>
</template>
