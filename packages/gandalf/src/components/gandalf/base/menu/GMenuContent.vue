<script setup lang="ts">
import type { DropdownMenuContentEmits, DropdownMenuContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { useForwardPropsEmits } from 'reka-ui'
import { DropdownMenuContent } from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { gandalfMenuContentVariants } from './index'

// Figma: Dropdown menu. 12px of padding on every side, as in `GDropdown`.
const props = withDefaults(
  defineProps<DropdownMenuContentProps & { class?: HTMLAttributes['class'] }>(),
  { class: undefined },
)
const emits = defineEmits<DropdownMenuContentEmits>()

const forwarded = useForwardPropsEmits(reactiveOmit(props, 'class'), emits)
</script>

<template>
  <DropdownMenuContent
    v-bind="forwarded"
    :class="cn(gandalfMenuContentVariants(), 'min-w-50 p-3', props.class)"
  >
    <slot />
  </DropdownMenuContent>
</template>
