<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed, inject } from 'vue'
import { BreadcrumbEllipsis } from '@/components/ui/breadcrumb'
import { cn } from '@/lib/utils'
import { breadcrumbSizeKey, gandalfBreadcrumbEllipsisVariants } from './index'
import type { GandalfBreadcrumbSize } from './index'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const size = inject(
  breadcrumbSizeKey,
  computed<GandalfBreadcrumbSize>(() => 'md'),
)
</script>

<template>
  <BreadcrumbEllipsis :class="cn(gandalfBreadcrumbEllipsisVariants({ size }), props.class)">
    <slot />
  </BreadcrumbEllipsis>
</template>
