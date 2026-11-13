<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { GandalfDialogHeaderType } from './index'
import { X } from 'lucide-vue-next'
import { DialogHeader } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { GButton } from '@/components/gandalf/base/button'
import GDialogClose from './GDialogClose.vue'
import { gandalfDialogHeaderIconVariants, gandalfDialogHeaderVariants } from './index'

// Figma: Dialog Header. Type=Left: optional icon, title and a Ghost primary md close button.
// Type=Center: only the title, centred.
const props = withDefaults(
  defineProps<{
    type?: GandalfDialogHeaderType
    /** Figma's "Show Button". Only drawn with `type="left"`. */
    showCloseButton?: boolean
    closeLabel?: string
    class?: HTMLAttributes['class']
  }>(),
  {
    type: 'left',
    showCloseButton: true,
    closeLabel: 'Close',
    class: undefined,
  },
)
</script>

<template>
  <DialogHeader :data-type="type" :class="cn(gandalfDialogHeaderVariants({ type }), props.class)">
    <span
      v-if="type === 'left' && $slots.icon"
      data-slot="dialog-header-icon"
      :class="gandalfDialogHeaderIconVariants()"
    >
      <slot name="icon" />
    </span>
    <slot />
    <GDialogClose v-if="type === 'left' && showCloseButton" as-child>
      <GButton variant="ghost-primary" size="md" class="shrink-0" :aria-label="closeLabel">
        <X />
      </GButton>
    </GDialogClose>
  </DialogHeader>
</template>
