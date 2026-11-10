<script setup lang="ts">
import type { DropdownMenuLabelProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { DropdownMenuLabel } from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { gandalfMenuLabelVariants } from './index'

// Figma: Divider, Type=Header. A group title; for richer headers (a user's name and email) put
// your own markup in the slot and override the classes with `class`.
const props = defineProps<DropdownMenuLabelProps & { class?: HTMLAttributes['class'] }>()
const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <DropdownMenuLabel v-bind="delegatedProps" :class="cn(gandalfMenuLabelVariants(), props.class)">
    <slot />
  </DropdownMenuLabel>
</template>
