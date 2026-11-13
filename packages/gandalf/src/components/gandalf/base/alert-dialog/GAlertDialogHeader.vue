<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { GandalfDialogHeaderType } from '@/components/gandalf/base/dialog'
import { AlertDialogHeader } from '@/components/ui/alert-dialog'
import { cn } from '@/lib/utils'
import {
  gandalfDialogHeaderIconVariants,
  gandalfDialogHeaderVariants,
} from '@/components/gandalf/base/dialog'

// Figma: Dialog Header. "Dialog Notification" uses Type=Center, so that is the default here. An
// alert dialog is closed with its actions, so it has no close button.
const props = withDefaults(
  defineProps<{
    type?: GandalfDialogHeaderType
    class?: HTMLAttributes['class']
  }>(),
  {
    type: 'center',
    class: undefined,
  },
)
</script>

<template>
  <AlertDialogHeader
    :data-type="type"
    :class="cn(gandalfDialogHeaderVariants({ type }), props.class)"
  >
    <span
      v-if="type === 'left' && $slots.icon"
      data-slot="alert-dialog-header-icon"
      :class="gandalfDialogHeaderIconVariants()"
    >
      <slot name="icon" />
    </span>
    <slot />
  </AlertDialogHeader>
</template>
