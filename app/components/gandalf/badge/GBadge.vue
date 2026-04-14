<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { GandalfBadgeColor, GandalfBadgeShape, GandalfBadgeVariant } from '.'
import { reactiveOmit } from '@vueuse/core'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { gandalfBadgeVariants } from '.'

const props = defineProps<
  PrimitiveProps & {
    variant?: GandalfBadgeVariant
    color?: GandalfBadgeColor
    shape?: GandalfBadgeShape
    class?: HTMLAttributes['class']
    disabled?: boolean
  }
>()

const delegatedProps = reactiveOmit(props, 'class', 'variant', 'color', 'disabled', 'shape')
const isDisabled = computed(() => !!props.disabled)
const shape = computed(() => props.shape || 'rounded')
</script>

<template>
  <Badge
    v-bind="delegatedProps"
    :class="
      cn(
        'transition-all duration-200 hover:opacity-80 active:opacity-100',
        gandalfBadgeVariants(variant, color),
        isDisabled ? 'cursor-not-allowed opacity-50' : '',
        shape === 'rounded' ? 'rounded-full' : 'rounded-sm',
        props.class,
      )
    "
  >
    <slot />
  </Badge>
</template>
