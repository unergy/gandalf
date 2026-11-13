<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { DialogFooter } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { GButton } from '@/components/gandalf/base/button'
import GDialogClose from './GDialogClose.vue'
import { gandalfDialogFooterVariants } from './index'

// Figma: "Group Button".
const props = withDefaults(
  defineProps<{
    /** Adds an Outline primary button that closes the dialog. */
    showCloseButton?: boolean
    closeLabel?: string
    class?: HTMLAttributes['class']
  }>(),
  {
    showCloseButton: false,
    closeLabel: 'Close',
    class: undefined,
  },
)
</script>

<template>
  <DialogFooter :class="cn(gandalfDialogFooterVariants(), props.class)">
    <GDialogClose v-if="showCloseButton" as-child>
      <GButton variant="outline-primary">{{ closeLabel }}</GButton>
    </GDialogClose>
    <slot />
  </DialogFooter>
</template>
