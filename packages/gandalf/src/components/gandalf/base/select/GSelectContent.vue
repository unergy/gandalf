<script setup lang="ts">
import type { SelectContentEmits, SelectContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { SelectContent } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { gandalfMenuContentVariants } from '@/components/gandalf/base/menu'

// Reka props whose default is not `false` stay undefined, so Reka applies its own default.
const props = withDefaults(
  defineProps<SelectContentProps & { class?: HTMLAttributes['class'] }>(),
  {
    sideFlip: undefined,
    alignFlip: undefined,
    hideShiftedArrow: undefined,
    avoidCollisions: undefined,
    bodyLock: undefined,
    disableOutsidePointerEvents: undefined,
    class: undefined,
  },
)
const emits = defineEmits<SelectContentEmits>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <SelectContent
    v-bind="delegatedProps"
    :class="cn(gandalfMenuContentVariants(), 'p-2', props.class)"
    @close-auto-focus="emits('closeAutoFocus', $event)"
    @escape-key-down="emits('escapeKeyDown', $event)"
    @pointer-down-outside="emits('pointerDownOutside', $event)"
  >
    <slot />
  </SelectContent>
</template>
