<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { FieldVariants } from '@/components/ui/field'
import { reactiveOmit } from '@vueuse/core'
import { Field } from '@/components/ui/field'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
  orientation?: FieldVariants['orientation']
}>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <Field v-bind="delegatedProps" :class="cn(props.class)">
    <slot />
  </Field>
</template>
