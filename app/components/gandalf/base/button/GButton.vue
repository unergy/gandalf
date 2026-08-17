<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { GandalfButtonVariants } from './index'
import { reactiveOmit } from '@vueuse/core'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const props = defineProps<
  PrimitiveProps & {
    variant?: GandalfButtonVariants['variant']
    size?: GandalfButtonVariants['size']
    class?: HTMLAttributes['class']
  }
>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <Button v-bind="delegatedProps" :class="cn(props.class)">
    <slot />
  </Button>
</template>
