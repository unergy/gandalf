<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { AlertDialogHeader } from '@/components/ui/alert-dialog'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <AlertDialogHeader v-bind="delegatedProps" :class="cn(props.class)">
    <slot />
  </AlertDialogHeader>
</template>
