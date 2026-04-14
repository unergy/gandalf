<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { GandalfBadgeColor, GandalfBadgeVariant } from '.'
import { reactiveOmit } from '@vueuse/core'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { gandalfBadgeVariants } from '.'

const props = defineProps<
  PrimitiveProps & {
    variant?: GandalfBadgeVariant
    color?: GandalfBadgeColor
    class?: HTMLAttributes['class']
  }
>()

const delegatedProps = reactiveOmit(props, 'class', 'variant', 'color')
</script>

<template>
  <Badge
    v-bind="delegatedProps"
    :class="cn(gandalfBadgeVariants(variant, color), props.class)"
  >
    <slot />
  </Badge>
</template>
