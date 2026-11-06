<script setup lang="ts">
import type { ScrollAreaScrollbarProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { ScrollBar } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { gandalfScrollBarVariants } from './index'

const props = withDefaults(
  defineProps<
    ScrollAreaScrollbarProps & {
      class?: HTMLAttributes['class']
    }
  >(),
  {
    orientation: 'vertical',
    class: undefined,
  },
)

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <ScrollBar
    v-bind="delegatedProps"
    :class="cn(gandalfScrollBarVariants({ orientation: props.orientation }), props.class)"
  />
</template>
