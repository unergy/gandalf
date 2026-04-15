<script setup lang="ts">
import type { ComboboxTriggerProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { ComboboxTrigger } from '@/components/ui/combobox'
import { cn } from '@/lib/utils'

const props = defineProps<ComboboxTriggerProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <ComboboxTrigger v-bind="delegatedProps" :class="cn(props.class)">
    <slot />
  </ComboboxTrigger>
</template>
