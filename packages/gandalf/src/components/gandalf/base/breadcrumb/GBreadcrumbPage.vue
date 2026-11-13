<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { BreadcrumbPage } from '@/components/ui/breadcrumb'
import { cn } from '@/lib/utils'
import { gandalfBreadcrumbPageVariants } from './index'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <BreadcrumbPage :class="cn(gandalfBreadcrumbPageVariants(), props.class)">
    <slot />
  </BreadcrumbPage>
</template>
