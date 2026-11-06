<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { FieldError } from '@/components/ui/field'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
  errors?: Array<string | { message: string | undefined } | undefined>
}>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <FieldError v-bind="delegatedProps" :class="cn(props.class)">
    <slot />
  </FieldError>
</template>
