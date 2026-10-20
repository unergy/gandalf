<script setup lang="ts">
import type { PaginationListItemProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { ButtonVariants } from '@/components/ui/button'
import { reactiveOmit } from '@vueuse/core'
import { PaginationItem } from '@/components/ui/pagination'
import { cn } from '@/lib/utils'

const props = withDefaults(
  defineProps<
    PaginationListItemProps & {
      size?: ButtonVariants['size']
      class?: HTMLAttributes['class']
      isActive?: boolean
    }
  >(),
  {
    size: 'icon',
    class: undefined,
  },
)

const delegatedProps = reactiveOmit(props, 'class', 'size', 'isActive')
</script>

<template>
  <PaginationItem
    v-bind="delegatedProps"
    :size="size"
    :is-active="isActive"
    :class="cn(props.class)"
  >
    <slot />
  </PaginationItem>
</template>
