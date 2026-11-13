<script setup lang="ts">
import type { DialogContentEmits, DialogContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { DialogScrollContent } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { gandalfDialogContentVariants } from './index'

defineOptions({
  inheritAttrs: false,
})

// Reka props whose default is not `false` stay undefined, so Reka applies its own default.
const props = withDefaults(
  defineProps<DialogContentProps & { class?: HTMLAttributes['class'] }>(),
  {
    disableOutsidePointerEvents: undefined,
    class: undefined,
  },
)
const emits = defineEmits<DialogContentEmits>()
</script>

<template>
  <!-- Same card as GDialogContent. shadcn's corner close button (always rendered by
       ui/dialog's scroll variant) is hidden: GDialogHeader brings Figma's own. -->
  <DialogScrollContent
    v-bind="{ ...$attrs, ...reactiveOmit(props, 'class') }"
    :class="
      cn(
        gandalfDialogContentVariants(),
        'max-w-[416px] sm:rounded-3xl [&>button:last-child]:hidden',
        props.class,
      )
    "
    @close-auto-focus="emits('closeAutoFocus', $event)"
    @escape-key-down="emits('escapeKeyDown', $event)"
    @focus-outside="emits('focusOutside', $event)"
    @interact-outside="emits('interactOutside', $event)"
    @open-auto-focus="emits('openAutoFocus', $event)"
    @pointer-down-outside="emits('pointerDownOutside', $event)"
  >
    <slot />
  </DialogScrollContent>
</template>
