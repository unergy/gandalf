<script setup lang="ts">
import type { DropdownMenuSubTriggerProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { DropdownMenuSubTrigger } from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { gandalfMenuItemVariants, gandalfMenuSubTriggerClass } from './index'

// The row that opens a submenu: a Menu Item with a trailing chevron, highlighted while its
// submenu is open.
const props = withDefaults(
  defineProps<DropdownMenuSubTriggerProps & { class?: HTMLAttributes['class'] }>(),
  { class: undefined },
)
const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <DropdownMenuSubTrigger
    v-bind="delegatedProps"
    :class="cn(gandalfMenuItemVariants(), gandalfMenuSubTriggerClass, props.class)"
  >
    <slot />
  </DropdownMenuSubTrigger>
</template>
