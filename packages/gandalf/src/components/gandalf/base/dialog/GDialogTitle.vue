<script setup lang="ts">
import type { DialogTitleProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { DialogTitle } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { gandalfDialogTitleVariants } from './index'

const props = defineProps<DialogTitleProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <DialogTitle v-bind="delegatedProps" :class="cn(gandalfDialogTitleVariants(), props.class)">
    <slot />
  </DialogTitle>
</template>
