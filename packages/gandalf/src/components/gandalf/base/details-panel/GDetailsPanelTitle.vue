<script setup lang="ts">
import type { DialogTitleProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { SheetTitle } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { gandalfDetailsPanelTitleVariants } from './index'

const props = defineProps<DialogTitleProps & { class?: HTMLAttributes['class'] }>()
</script>

<template>
  <SheetTitle
    v-bind="reactiveOmit(props, 'class')"
    :class="cn(gandalfDetailsPanelTitleVariants(), props.class)"
  >
    <slot />
  </SheetTitle>
</template>
