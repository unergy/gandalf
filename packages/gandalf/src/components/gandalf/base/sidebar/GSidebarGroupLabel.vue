<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { SidebarGroupLabel } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { gandalfSidebarGroupLabelVariants } from './index'

// Figma: Sidebar Title. Put the label in a <span> so the collapsed rail can hide it and keep the
// icon, as Figma's Type=Icon does.
const props = defineProps<
  PrimitiveProps & {
    class?: HTMLAttributes['class']
  }
>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <SidebarGroupLabel
    v-bind="delegatedProps"
    :class="cn(gandalfSidebarGroupLabelVariants(), props.class)"
  >
    <slot />
  </SidebarGroupLabel>
</template>
