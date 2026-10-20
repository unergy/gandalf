<script setup lang="ts">
import type { ComboboxItemIndicatorProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { ComboboxItemIndicator } from '@/components/ui/combobox'
import { cn } from '@/lib/utils'

const props = defineProps<ComboboxItemIndicatorProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <ComboboxItemIndicator v-bind="delegatedProps" :class="cn(props.class)">
    <slot />
  </ComboboxItemIndicator>
</template>
