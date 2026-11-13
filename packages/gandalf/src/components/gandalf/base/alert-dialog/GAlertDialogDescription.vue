<script setup lang="ts">
import type { AlertDialogDescriptionProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { AlertDialogDescription } from '@/components/ui/alert-dialog'
import { cn } from '@/lib/utils'
import { gandalfDialogDescriptionVariants } from '@/components/gandalf/base/dialog'

// Figma puts the description in its own band below the header: place it inside GAlertDialogBody.
const props = defineProps<AlertDialogDescriptionProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <AlertDialogDescription
    v-bind="delegatedProps"
    :class="cn(gandalfDialogDescriptionVariants(), props.class)"
  >
    <slot />
  </AlertDialogDescription>
</template>
