<script setup lang="ts">
import type { DropdownMenuSeparatorProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { gandalfMenuSeparatorVariants } from './index'

// Figma: Divider, Type=Line. A 36px row with the line in the middle and 4px of gap around it: the
// item above already brings its 4px, so the line sits 17.5px below it and 21.5px above the next.
const props = defineProps<DropdownMenuSeparatorProps & { class?: HTMLAttributes['class'] }>()
const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <DropdownMenuSeparator
    v-bind="delegatedProps"
    :class="cn(gandalfMenuSeparatorVariants(), 'mt-[17.5px] mb-[21.5px]', props.class)"
  />
</template>
