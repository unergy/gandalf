<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <Breadcrumb :class="cn(props.class)">
    <slot />
  </Breadcrumb>
</template>
