<script setup lang="ts">
import type { AccordionItemProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { GandalfAccordionType } from './index'
import { reactiveOmit } from '@vueuse/core'
import { computed, inject, provide } from 'vue'
import { AccordionItem } from '@/components/ui/accordion'
import { cn } from '@/lib/utils'
import { ACCORDION_ITEM_KEY, ACCORDION_KEY, gandalfAccordionItemVariants } from './index'

const props = withDefaults(
  defineProps<
    AccordionItemProps & {
      class?: HTMLAttributes['class']
      /** Figma "Accordeon Main" Type. Only used by `variant="main"`. */
      type?: GandalfAccordionType
    }
  >(),
  {
    class: undefined,
    type: 'visualization',
    disabled: undefined,
    unmountOnHide: undefined,
  },
)

const delegatedProps = reactiveOmit(props, 'class', 'type')

const accordion = inject(
  ACCORDION_KEY,
  computed(() => ({ variant: 'main' as const, category: 'main' as const })),
)
const context = computed(() => ({ ...accordion.value, type: props.type }))

provide(ACCORDION_ITEM_KEY, context)
</script>

<template>
  <AccordionItem
    v-slot="slotProps"
    v-bind="delegatedProps"
    :class="cn(gandalfAccordionItemVariants(context), props.class)"
  >
    <slot v-bind="slotProps" />
  </AccordionItem>
</template>
