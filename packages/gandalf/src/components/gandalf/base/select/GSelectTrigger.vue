<script setup lang="ts">
import type { SelectTriggerProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { SelectTrigger } from '@/components/ui/select'
import { cn } from '@/lib/utils'

const props = defineProps<
  SelectTriggerProps & { class?: HTMLAttributes['class']; size?: 'sm' | 'default' }
>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <SelectTrigger v-bind="delegatedProps" :class="cn(props.class)">
    <slot />
  </SelectTrigger>
</template>
