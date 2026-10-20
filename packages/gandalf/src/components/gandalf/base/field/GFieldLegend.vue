<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { FieldLegend } from '@/components/ui/field'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
  variant?: 'legend' | 'label'
}>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <FieldLegend v-bind="delegatedProps" :class="cn(props.class)">
    <slot />
  </FieldLegend>
</template>
