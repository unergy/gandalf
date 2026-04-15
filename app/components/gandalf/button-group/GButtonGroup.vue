<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { ButtonGroupVariants } from '@/components/ui/button-group'
import { reactiveOmit } from '@vueuse/core'
import { ButtonGroup } from '@/components/ui/button-group'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
  orientation?: ButtonGroupVariants['orientation']
}>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <ButtonGroup
    v-bind="delegatedProps"
    :class="cn(props.class)"
  >
    <slot />
  </ButtonGroup>
</template>
