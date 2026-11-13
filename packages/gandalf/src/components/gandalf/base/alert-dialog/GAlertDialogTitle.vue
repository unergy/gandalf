<script setup lang="ts">
import type { AlertDialogTitleProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { AlertDialogTitle } from '@/components/ui/alert-dialog'
import { cn } from '@/lib/utils'
import { gandalfDialogTitleVariants } from '@/components/gandalf/base/dialog'

const props = defineProps<AlertDialogTitleProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <AlertDialogTitle v-bind="delegatedProps" :class="cn(gandalfDialogTitleVariants(), props.class)">
    <slot />
  </AlertDialogTitle>
</template>
