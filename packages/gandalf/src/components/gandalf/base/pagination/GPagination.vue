<script setup lang="ts">
import type { PaginationRootEmits, PaginationRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { Pagination } from '@/components/ui/pagination'
import { cn } from '@/lib/utils'

const props = defineProps<
  PaginationRootProps & {
    class?: HTMLAttributes['class']
  }
>()
const emits = defineEmits<PaginationRootEmits>()
</script>

<template>
  <Pagination
    v-slot="slotProps"
    v-bind="reactiveOmit(props, 'class')"
    :class="cn(props.class)"
    @update:page="emits('update:page', $event)"
  >
    <slot v-bind="slotProps" />
  </Pagination>
</template>
