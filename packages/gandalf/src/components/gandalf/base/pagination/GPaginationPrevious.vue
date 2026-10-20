<script setup lang="ts">
import type { PaginationPrevProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { ButtonVariants } from '@/components/ui/button'
import { reactiveOmit } from '@vueuse/core'
import { PaginationPrevious } from '@/components/ui/pagination'
import { cn } from '@/lib/utils'

const props = withDefaults(
  defineProps<
    PaginationPrevProps & {
      size?: ButtonVariants['size']
      class?: HTMLAttributes['class']
    }
  >(),
  {
    size: 'default',
    class: undefined,
  },
)

const delegatedProps = reactiveOmit(props, 'class', 'size')
</script>

<template>
  <PaginationPrevious v-bind="delegatedProps" :size="size" :class="cn(props.class)">
    <slot />
  </PaginationPrevious>
</template>
