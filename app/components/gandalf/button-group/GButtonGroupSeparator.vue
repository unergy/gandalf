<script setup lang="ts">
import type { SeparatorProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { ButtonGroupSeparator } from '@/components/ui/button-group'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<SeparatorProps & {
  class?: HTMLAttributes['class']
}>(), {
  orientation: 'vertical',
  class: undefined,
})

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <ButtonGroupSeparator v-bind="delegatedProps" :class="cn(props.class)" />
</template>
