<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { GMenuContent, GMenuLabel } from '@/components/gandalf/base/menu'
import { CollapsibleContent } from '@/components/ui/collapsible'
import { cn } from '@/lib/utils'
import { gandalfSidebarCollapsibleContentVariants } from './index'
import { useSidebarCollapsibleRail } from './context'

const props = defineProps<{
  /**
   * Title of the floating menu in the collapsed rail (Figma Menu: Divider, Type=Header). Usually
   * the parent's label, which the rail does not show.
   */
  label?: string
  class?: HTMLAttributes['class']
}>()

const rail = useSidebarCollapsibleRail()
</script>

<template>
  <GMenuContent
    v-if="rail"
    side="right"
    align="start"
    :side-offset="12"
    :class="cn('min-w-52 p-2', props.class)"
  >
    <GMenuLabel v-if="label" class="h-8 px-2">{{ label }}</GMenuLabel>
    <slot />
  </GMenuContent>

  <CollapsibleContent
    v-else
    :class="cn(gandalfSidebarCollapsibleContentVariants(), props.class)"
  >
    <slot />
  </CollapsibleContent>
</template>
