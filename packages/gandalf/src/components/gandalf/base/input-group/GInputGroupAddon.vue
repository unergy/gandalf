<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { InputGroupVariants } from '@/components/ui/input-group'
import { reactiveOmit } from '@vueuse/core'
import { InputGroupAddon } from '@/components/ui/input-group'
import { cn } from '@/lib/utils'

const props = withDefaults(
  defineProps<{
    align?: InputGroupVariants['align']
    class?: HTMLAttributes['class']
  }>(),
  {
    align: 'inline-start',
    class: undefined,
  },
)

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <InputGroupAddon v-bind="delegatedProps" :class="cn(props.class)">
    <slot />
  </InputGroupAddon>
</template>
