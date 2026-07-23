<script setup lang="ts">
import type { AccordionRootEmits, AccordionRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { Accordion } from '@/components/ui/accordion'
import { cn } from '@/lib/utils'

const props = defineProps<AccordionRootProps & { class?: HTMLAttributes['class'] }>()

const emits = defineEmits<AccordionRootEmits>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <Accordion
    v-slot="slotProps"
    v-bind="delegatedProps"
    :class="cn(props.class)"
    @update:model-value="emits('update:modelValue', $event)"
  >
    <slot v-bind="slotProps" />
  </Accordion>
</template>
