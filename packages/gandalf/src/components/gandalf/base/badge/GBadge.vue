<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { GandalfBadgeColor, GandalfBadgeVariants } from './index'
import { reactiveOmit } from '@vueuse/core'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { gandalfBadgeVariants, gandalfBadgeColorClass, gandalfBadgeColorStyle } from './index'

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
    :style="disabled ? undefined : gandalfBadgeColorStyle(variant ?? 'tonal', color ?? 'default')"
    :class="
      cn(
        gandalfBadgeVariants({ variant, shape, size }),
        disabled
          ? cn(
              'bg-muted text-muted-foreground-quiet pointer-events-none cursor-not-allowed',
              variant === 'outlined' && 'border-muted-foreground-quiet',
            )
          : gandalfBadgeColorClass(variant ?? 'tonal', color ?? 'default'),
        props.class,
      )
    "
  >
    <slot />
  </Badge>
</template>
