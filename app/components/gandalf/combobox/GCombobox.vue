<script setup lang="ts">
import type { ComboboxRootEmits, ComboboxRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { Combobox } from '@/components/ui/combobox'
import { cn } from '@/lib/utils'

const props = defineProps<ComboboxRootProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<ComboboxRootEmits>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <Combobox
    v-bind="delegatedProps"
    v-slot="slotProps"
    :class="cn(props.class)"
    @update:model-value="emits('update:modelValue', $event)"
    @update:open="emits('update:open', $event)"
    @update:search-term="emits('update:searchTerm', $event)"
  >
    <slot v-bind="slotProps" />
  </Combobox>
</template>
