<script setup lang="ts">
import type { LabelProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

const props = defineProps<
  LabelProps & {
    class?: HTMLAttributes['class']
  }
>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <Label v-bind="delegatedProps" :class="cn(props.class)">
    <slot />
  </Label>
</template>
