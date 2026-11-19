<script setup lang="ts">
import type { DropdownMenuSubContentEmits, DropdownMenuSubContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { useForwardPropsEmits } from 'reka-ui'
import { DropdownMenuSubContent } from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { gandalfMenuContentVariants } from './index'

// The floating list of a submenu: the same container as `GMenuContent`, scrolling when it doesn't
// fit on screen.
const props = withDefaults(
  defineProps<DropdownMenuSubContentProps & { class?: HTMLAttributes['class'] }>(),
  { class: undefined },
)
const emits = defineEmits<DropdownMenuSubContentEmits>()

const forwarded = useForwardPropsEmits(reactiveOmit(props, 'class'), emits)
</script>

<template>
  <DropdownMenuSubContent
    v-bind="forwarded"
    :class="
      cn(
        gandalfMenuContentVariants(),
        'max-h-(--reka-dropdown-menu-content-available-height) min-w-50 overflow-x-hidden overflow-y-auto p-3',
        props.class,
      )
    "
  >
    <slot />
  </DropdownMenuSubContent>
</template>
