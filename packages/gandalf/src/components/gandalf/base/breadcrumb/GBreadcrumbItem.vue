<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { BreadcrumbItem } from '@/components/ui/breadcrumb'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <BreadcrumbItem :class="cn(props.class)">
    <slot />
  </BreadcrumbItem>
</template>
