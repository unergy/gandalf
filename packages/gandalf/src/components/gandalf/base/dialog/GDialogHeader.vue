<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { DialogHeader } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <DialogHeader v-bind="delegatedProps" :class="cn(props.class)">
    <slot />
  </DialogHeader>
</template>
