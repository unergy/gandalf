<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { ButtonGroupVariants } from '@/components/ui/button-group'
import { reactiveOmit } from '@vueuse/core'
import { ButtonGroupText } from '@/components/ui/button-group'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<PrimitiveProps & {
  class?: HTMLAttributes['class']
  orientation?: ButtonGroupVariants['orientation']
}>(), {
  as: 'div',
  class: undefined,
  orientation: undefined,
})

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <ButtonGroupText v-bind="delegatedProps" :class="cn(props.class)">
    <slot />
  </ButtonGroupText>
</template>
