<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
  defaultValue?: string | number
  modelValue?: string | number
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <Textarea
    v-bind="delegatedProps"
    :class="cn(props.class)"
    @update:model-value="emits('update:modelValue', $event)"
  />
</template>
