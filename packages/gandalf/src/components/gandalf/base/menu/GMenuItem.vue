<script setup lang="ts">
import type { DropdownMenuItemEmits, DropdownMenuItemProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { GandalfMenuItemVariant } from './index'
import { reactiveOmit } from '@vueuse/core'
import { useForwardPropsEmits } from 'reka-ui'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { gandalfMenuItemVariants } from './index'

// Figma: Menu Item. The leading icon goes first in the slot; a badge or trailing icon after the
// label. shadcn's own `variant` is left at default on purpose: its destructive focus fill is not
// Figma's, which keeps the same dark overlays as any other item.
const props = withDefaults(
  defineProps<
    DropdownMenuItemProps & {
      variant?: GandalfMenuItemVariant
      class?: HTMLAttributes['class']
    }
  >(),
  { variant: 'default', class: undefined },
)
const emits = defineEmits<DropdownMenuItemEmits>()

const forwarded = useForwardPropsEmits(reactiveOmit(props, 'variant', 'class'), emits)
</script>

<template>
  <DropdownMenuItem
    v-bind="forwarded"
    :data-menu-variant="variant"
    :class="cn(gandalfMenuItemVariants({ variant }), props.class)"
  >
    <slot />
  </DropdownMenuItem>
</template>
