<script setup lang="ts">
import type { ComboboxContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { ComboboxList } from '@/components/ui/combobox'
import { cn } from '@/lib/utils'

const props = defineProps<ComboboxContentProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <ComboboxList v-bind="delegatedProps" :class="cn(props.class)">
    <slot />
  </ComboboxList>
</template>
