<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed, inject } from 'vue'
import { BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { cn } from '@/lib/utils'
import { breadcrumbSizeKey, gandalfBreadcrumbSeparatorVariants } from './index'
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
  <BreadcrumbSeparator :class="cn(gandalfBreadcrumbSeparatorVariants({ size }), props.class)">
    <slot />
  </BreadcrumbSeparator>
</template>
