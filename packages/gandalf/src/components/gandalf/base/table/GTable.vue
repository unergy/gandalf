<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Table } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { gandalfTableVariants } from './index'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div :class="gandalfTableVariants()">
    <Table :class="cn(props.class)">
      <slot />
    </Table>
  </div>
</template>
