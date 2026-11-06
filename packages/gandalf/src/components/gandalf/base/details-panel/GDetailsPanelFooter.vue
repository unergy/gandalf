<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { SheetFooter } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { gandalfDetailsPanelFooterVariants } from './index'

// Figma: Detail Panel → "Group Button".
const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <SheetFooter :class="cn(gandalfDetailsPanelFooterVariants(), props.class)">
    <slot />
  </SheetFooter>
</template>
