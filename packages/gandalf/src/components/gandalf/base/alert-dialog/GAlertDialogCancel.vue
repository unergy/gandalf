<script setup lang="ts">
import type { AlertDialogCancelProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { GandalfButtonSize, GandalfButtonVariant } from '@/components/gandalf/base/button'
import { reactiveOmit } from '@vueuse/core'
import { AlertDialogCancel } from '@/components/ui/alert-dialog'
import { cn } from '@/lib/utils'
import { gandalfButtonVariants } from '@/components/gandalf/base/button'

// Figma: "Action 2" in "Dialog Notification", an Outline primary md Button. `mt-0` undoes the
// stacked-layout margin of ui/alert-dialog: Figma keeps the buttons in a row.
const props = withDefaults(
  defineProps<
    AlertDialogCancelProps & {
      variant?: GandalfButtonVariant
      size?: GandalfButtonSize
      class?: HTMLAttributes['class']
    }
  >(),
  {
    variant: 'outline-primary',
    size: 'md',
    class: undefined,
  },
)

const delegatedProps = reactiveOmit(props, 'class', 'variant', 'size')
</script>

<template>
  <AlertDialogCancel
    v-bind="delegatedProps"
    :class="cn(gandalfButtonVariants({ variant, size }), 'mt-0 sm:mt-0', props.class)"
  >
    <slot />
  </AlertDialogCancel>
</template>
