<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { AlertDialogFooter } from '@/components/ui/alert-dialog'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <AlertDialogFooter v-bind="delegatedProps" :class="cn(props.class)">
    <slot />
  </AlertDialogFooter>
</template>
