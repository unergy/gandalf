<script setup lang="ts">
import type { CollapsibleTriggerProps } from 'reka-ui'
import { GMenuTrigger } from '@/components/gandalf/base/menu'
import { CollapsibleTrigger } from '@/components/ui/collapsible'
import { useSidebarCollapsibleRail } from './context'

// Wraps the parent's GSidebarMenuButton. It folds and unfolds the nested menu, or opens the
// floating menu in the collapsed rail.
const props = withDefaults(defineProps<CollapsibleTriggerProps>(), { asChild: true })

const rail = useSidebarCollapsibleRail()
</script>

<template>
  <GMenuTrigger v-if="rail" v-bind="props">
    <slot />
  </GMenuTrigger>
  <CollapsibleTrigger v-else v-bind="props">
    <slot />
  </CollapsibleTrigger>
</template>
