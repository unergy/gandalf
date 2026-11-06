<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { FieldTitle } from '@/components/ui/field'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <FieldTitle v-bind="delegatedProps" :class="cn(props.class)">
    <slot />
  </FieldTitle>
</template>
