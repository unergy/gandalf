<script setup lang="ts">
import type { SelectItemProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { SelectItem } from '@/components/ui/select'
import { cn } from '@/lib/utils'

const props = defineProps<SelectItemProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <SelectItem v-bind="delegatedProps" :class="cn(props.class)">
    <template #indicator-icon><slot name="indicator-icon" /></template>
    <slot />
  </SelectItem>
</template>
