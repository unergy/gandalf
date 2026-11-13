<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed, inject } from 'vue'
import { BreadcrumbList } from '@/components/ui/breadcrumb'
import { cn } from '@/lib/utils'
import { breadcrumbSizeKey, gandalfBreadcrumbListVariants } from './index'
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
  <BreadcrumbList :class="cn(gandalfBreadcrumbListVariants({ size }), props.class)">
    <slot />
  </BreadcrumbList>
</template>
