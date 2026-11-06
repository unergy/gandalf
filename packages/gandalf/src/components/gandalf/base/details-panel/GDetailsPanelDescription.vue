<script setup lang="ts">
import type { DialogDescriptionProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { SheetDescription } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

// Figma does not draw a description inside the header; it is here for assistive technology, and is
// usually rendered with `class="sr-only"`.
const props = defineProps<DialogDescriptionProps & { class?: HTMLAttributes['class'] }>()
</script>

<template>
  <SheetDescription
    v-bind="reactiveOmit(props, 'class')"
    :class="cn('text-base-foreground-quiet text-sm leading-[normal]', props.class)"
  >
    <slot />
  </SheetDescription>
</template>
