<script setup lang="ts">
import type { ComboboxInputProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { ComboboxInput } from '@/components/ui/combobox'
import { cn } from '@/lib/utils'

const props = defineProps<ComboboxInputProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <ComboboxInput v-bind="delegatedProps" :class="cn(props.class)">
    <slot />
  </ComboboxInput>
</template>
