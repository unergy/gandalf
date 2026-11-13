<script setup lang="ts">
import type { AlertDialogActionProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { GandalfButtonSize, GandalfButtonVariant } from '@/components/gandalf/base/button'
import { reactiveOmit } from '@vueuse/core'
import { AlertDialogAction } from '@/components/ui/alert-dialog'
import { cn } from '@/lib/utils'
import { gandalfButtonVariants } from '@/components/gandalf/base/button'

// Figma: "Action 1" in "Dialog Notification", a Tonal primary md Button.
const props = withDefaults(
  defineProps<
    AlertDialogActionProps & {
      variant?: GandalfButtonVariant
      size?: GandalfButtonSize
      class?: HTMLAttributes['class']
    }
  >(),
  {
    variant: 'tonal-primary',
    size: 'md',
    class: undefined,
  },
)

const delegatedProps = reactiveOmit(props, 'class', 'variant', 'size')
</script>

<template>
  <AlertDialogAction
    v-bind="delegatedProps"
    :class="cn(gandalfButtonVariants({ variant, size }), props.class)"
  >
    <slot />
  </AlertDialogAction>
</template>
