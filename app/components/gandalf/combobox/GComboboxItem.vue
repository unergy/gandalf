<script setup lang="ts">
import type { ComboboxItemEmits, ComboboxItemProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { ComboboxItem } from '@/components/ui/combobox'
import { cn } from '@/lib/utils'

const props = defineProps<ComboboxItemProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<ComboboxItemEmits>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <ComboboxItem
    v-bind="delegatedProps"
    :class="cn(props.class)"
    @select="emits('select', $event)"
  >
    <slot />
  </ComboboxItem>
</template>
