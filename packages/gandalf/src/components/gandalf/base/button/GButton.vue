<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { GandalfButtonSize, GandalfButtonVariant } from './index'
import { reactiveOmit } from '@vueuse/core'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { gandalfButtonVariants } from './index'

const props = defineProps<
  PrimitiveProps & {
    variant?: GandalfButtonVariant
    size?: GandalfButtonSize
    /** Red notification dot on the top-right corner ("Alert Dot" in Figma). */
    alertDot?: boolean
    class?: HTMLAttributes['class']
  }
>()

const delegatedProps = reactiveOmit(props, 'class', 'variant', 'size', 'alertDot')
</script>

<template>
  <Button
    v-bind="delegatedProps"
    :class="cn(gandalfButtonVariants({ variant, size }), props.class)"
  >
    <slot />
    <span
      v-if="alertDot"
      data-slot="button-alert-dot"
      class="bg-destructive border-card absolute -top-[3px] -right-[3px] size-2.5 rounded-full border-2"
    />
  </Button>
</template>
