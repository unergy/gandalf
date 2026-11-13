<script setup lang="ts">
import type { DialogContentEmits, DialogContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { DialogContent } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { gandalfDialogContentVariants } from './index'

defineOptions({
  inheritAttrs: false,
})

// The close button lives in GDialogHeader (Figma: Dialog Header, Type=Left), so shadcn's corner
// button is always turned off here.
const props = defineProps<DialogContentProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<DialogContentEmits>()
</script>

<template>
  <DialogContent
    v-bind="{ ...$attrs, ...reactiveOmit(props, 'class') }"
    :show-close-button="false"
    :class="cn(gandalfDialogContentVariants(), props.class)"
    @close-auto-focus="emits('closeAutoFocus', $event)"
    @escape-key-down="emits('escapeKeyDown', $event)"
    @focus-outside="emits('focusOutside', $event)"
    @interact-outside="emits('interactOutside', $event)"
    @open-auto-focus="emits('openAutoFocus', $event)"
    @pointer-down-outside="emits('pointerDownOutside', $event)"
  >
    <slot />
  </DialogContent>
</template>
