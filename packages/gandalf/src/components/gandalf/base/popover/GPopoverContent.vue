<script setup lang="ts">
import type { PopoverContentEmits, PopoverContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { PopoverContent } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

const props = defineProps<PopoverContentProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<PopoverContentEmits>()

// `align` and `sideOffset` are left undefined on purpose: Vue applies the child's default when a
// prop comes in as `undefined`, so shadcn's own defaults stand rather than being re-declared here.
const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <PopoverContent
    v-bind="delegatedProps"
    :class="cn(props.class)"
    @escape-key-down="emits('escapeKeyDown', $event)"
    @pointer-down-outside="emits('pointerDownOutside', $event)"
    @focus-outside="emits('focusOutside', $event)"
    @interact-outside="emits('interactOutside', $event)"
    @open-auto-focus="emits('openAutoFocus', $event)"
    @close-auto-focus="emits('closeAutoFocus', $event)"
  >
    <slot />
  </PopoverContent>
</template>
