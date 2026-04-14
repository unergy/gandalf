<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { GandalfBadgeColor, GandalfBadgeVariants } from '.'
import { reactiveOmit } from '@vueuse/core'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { gandalfBadgeVariants, gandalfBadgeColorClass } from '.'

const props = defineProps<
  PrimitiveProps & {
    variant?: GandalfBadgeVariants['variant']
    color?: GandalfBadgeColor
    shape?: GandalfBadgeVariants['shape']
    size?: GandalfBadgeVariants['size']
    class?: HTMLAttributes['class']
    disabled?: boolean
  }
>()

const delegatedProps = reactiveOmit(props, 'class', 'variant', 'color', 'disabled', 'shape', 'size')
</script>

<template>
  <Badge
    v-bind="delegatedProps"
    :class="
      cn(
        gandalfBadgeVariants({ variant, shape, size }),
        gandalfBadgeColorClass(variant ?? 'default', color ?? 'default'),
        disabled ? 'cursor-not-allowed opacity-50' : '',
        props.class,
      )
    "
  >
    <slot />
  </Badge>
</template>
