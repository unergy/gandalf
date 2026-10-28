<script setup lang="ts">
import type { ComboboxInputEmits, ComboboxInputProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { ComboboxInput } from '@/components/ui/combobox'
import { cn } from '@/lib/utils'

const props = defineProps<ComboboxInputProps & { class?: HTMLAttributes['class'] }>()
// Declared and re-emitted, not left to fall through: Vue drops `onUpdate:modelValue` from the
// attrs of a component that declares `modelValue`, so the typed search never reached the parent.
const emits = defineEmits<ComboboxInputEmits>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <ComboboxInput
    v-bind="delegatedProps"
    :class="cn(props.class)"
    @update:model-value="emits('update:modelValue', $event)"
  >
    <slot />
  </ComboboxInput>
</template>
