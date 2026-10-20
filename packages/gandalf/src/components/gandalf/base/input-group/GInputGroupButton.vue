<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { InputGroupButtonVariants } from '@/components/ui/input-group'
import type { ButtonVariants } from '@/components/ui/button'
import { reactiveOmit } from '@vueuse/core'
import { InputGroupButton } from '@/components/ui/input-group'
import { cn } from '@/lib/utils'

const props = withDefaults(
  defineProps<{
    variant?: ButtonVariants['variant']
    size?: InputGroupButtonVariants['size']
    class?: HTMLAttributes['class']
  }>(),
  {
    size: 'xs',
    variant: 'ghost',
    class: undefined,
  },
)

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <InputGroupButton v-bind="delegatedProps" :class="cn(props.class)">
    <slot />
  </InputGroupButton>
</template>
