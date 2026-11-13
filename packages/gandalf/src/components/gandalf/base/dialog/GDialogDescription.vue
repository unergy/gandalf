<script setup lang="ts">
import type { DialogDescriptionProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { DialogDescription } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { gandalfDialogDescriptionVariants } from './index'

// Figma puts the description in its own band below the header: place it inside GDialogBody.
const props = defineProps<DialogDescriptionProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <DialogDescription
    v-bind="delegatedProps"
    :class="cn(gandalfDialogDescriptionVariants(), props.class)"
  >
    <slot />
  </DialogDescription>
</template>
