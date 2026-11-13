<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { provide, toRef } from 'vue'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { cn } from '@/lib/utils'
import { breadcrumbSizeKey } from './index'
import type { GandalfBreadcrumbSize } from './index'

const props = withDefaults(
  defineProps<{
    size?: GandalfBreadcrumbSize
    class?: HTMLAttributes['class']
  }>(),
  {
    size: 'md',
    class: undefined,
  },
)

provide(
  breadcrumbSizeKey,
  toRef(() => props.size),
)
</script>

<template>
  <Breadcrumb :data-size="size" :class="cn(props.class)">
    <slot />
  </Breadcrumb>
</template>
