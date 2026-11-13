<script setup lang="ts">
import type { DialogContentEmits, DialogContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { GandalfDetailsPanelSide } from './index'
import { reactiveOmit } from '@vueuse/core'
import { SheetContent } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { gandalfDetailsPanelContentVariants } from './index'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<
    DialogContentProps & {
      /** Edge the panel is docked to. Figma only shows `right`. */
      side?: GandalfDetailsPanelSide
      class?: HTMLAttributes['class']
    }
  >(),
  {
    side: 'right',
    disableOutsidePointerEvents: undefined,
    class: undefined,
  },
)

const emits = defineEmits<DialogContentEmits>()
</script>

<template>
  <SheetContent
    v-bind="{ ...$attrs, ...reactiveOmit(props, 'class') }"
    :class="cn(gandalfDetailsPanelContentVariants({ side }), props.class)"
    @close-auto-focus="emits('closeAutoFocus', $event)"
    @escape-key-down="emits('escapeKeyDown', $event)"
    @focus-outside="emits('focusOutside', $event)"
    @interact-outside="emits('interactOutside', $event)"
    @open-auto-focus="emits('openAutoFocus', $event)"
    @pointer-down-outside="emits('pointerDownOutside', $event)"
  >
    <slot />
  </SheetContent>
</template>
