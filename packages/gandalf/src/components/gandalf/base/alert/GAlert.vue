<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { GandalfAlertVariants } from './index'
import { reactiveOmit } from '@vueuse/core'
import { Alert } from '@/components/ui/alert'
import { cn } from '@/lib/utils'
import { gandalfAlertVariants } from './index'

const props = defineProps<{
  class?: HTMLAttributes['class']
  variant?: GandalfAlertVariants['variant']
}>()

const delegatedProps = reactiveOmit(props, 'class', 'variant')
</script>

<template>
  <Alert
    v-bind="delegatedProps"
    :variant="variant"
    :class="cn(gandalfAlertVariants({ variant }), props.class)"
  >
    <slot />
  </Alert>
</template>
