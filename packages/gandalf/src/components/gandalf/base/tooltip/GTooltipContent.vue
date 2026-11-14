<script setup lang="ts">
import type { TooltipContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { TooltipContent } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { gandalfTooltipContentVariants } from './index'

// Reka props whose default is not `false` stay undefined, so Reka applies its own default.
const props = withDefaults(
  defineProps<TooltipContentProps & { class?: HTMLAttributes['class'] }>(),
  {
    sideFlip: undefined,
    alignFlip: undefined,
    hideShiftedArrow: undefined,
    avoidCollisions: undefined,
    hideWhenDetached: undefined,
    class: undefined,
  },
)

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <TooltipContent v-bind="delegatedProps" :class="cn(gandalfTooltipContentVariants(), props.class)">
    <slot />
  </TooltipContent>
</template>
