<script setup lang="ts">
import type { ComboboxContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { ComboboxList } from '@/components/ui/combobox'
import { cn } from '@/lib/utils'
import { gandalfMenuContentVariants } from '@/components/gandalf/base/menu'

// Reka props whose default is not `false` stay undefined, so Reka applies its own default.
const props = withDefaults(
  defineProps<ComboboxContentProps & { class?: HTMLAttributes['class'] }>(),
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

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <ComboboxList v-bind="delegatedProps" :class="cn(gandalfMenuContentVariants(), props.class)">
    <slot />
  </ComboboxList>
</template>
