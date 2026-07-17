<script setup lang="ts">
import type { TooltipContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { TooltipContent } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { gandalfTooltipContentVariants } from './index'

const props = defineProps<TooltipContentProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <TooltipContent
    v-bind="delegatedProps"
    :class="cn(gandalfTooltipContentVariants(), props.class)"
  >
    <slot />
  </TooltipContent>
</template>
