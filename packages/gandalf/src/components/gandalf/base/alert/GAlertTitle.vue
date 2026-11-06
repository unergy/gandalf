<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { AlertTitle } from '@/components/ui/alert'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <AlertTitle v-bind="delegatedProps" :class="cn(props.class)">
    <slot />
  </AlertTitle>
</template>
