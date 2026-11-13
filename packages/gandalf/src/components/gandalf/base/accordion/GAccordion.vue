<script setup lang="ts">
import type { AccordionRootEmits, AccordionRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { GandalfAccordionCategory, GandalfAccordionVariant } from './index'
import { reactiveOmit } from '@vueuse/core'
import { computed, provide } from 'vue'
import { Accordion } from '@/components/ui/accordion'
import { cn } from '@/lib/utils'
import { ACCORDION_KEY, gandalfAccordionVariants } from './index'

const props = withDefaults(
  defineProps<
    AccordionRootProps & {
      class?: HTMLAttributes['class']
      variant?: GandalfAccordionVariant
      category?: GandalfAccordionCategory
    }
  >(),
  {
    class: undefined,
    variant: 'main',
    category: 'main',
    collapsible: undefined,
    disabled: undefined,
    unmountOnHide: undefined,
  },
)

const emits = defineEmits<AccordionRootEmits>()

const delegatedProps = reactiveOmit(props, 'class', 'variant', 'category')

provide(
  ACCORDION_KEY,
  computed(() => ({ variant: props.variant, category: props.category })),
)
</script>

<template>
  <Accordion
    v-slot="slotProps"
    v-bind="delegatedProps"
    :class="cn(gandalfAccordionVariants({ variant, category }), props.class)"
    @update:model-value="emits('update:modelValue', $event)"
  >
    <slot v-bind="slotProps" />
  </Accordion>
</template>
