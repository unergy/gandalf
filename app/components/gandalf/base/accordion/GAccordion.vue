<script setup lang="ts">
import type { AccordionRootEmits, AccordionRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { computed, provide } from 'vue'
import { Accordion } from '@/components/ui/accordion'
import { cn } from '@/lib/utils'
import { ACCORDION_VARIANT_KEY, gandalfAccordionVariants, type GandalfAccordionVariant } from './index'

const props = defineProps<
  AccordionRootProps & { class?: HTMLAttributes['class']; variant?: GandalfAccordionVariant }
>()

const emits = defineEmits<AccordionRootEmits>()

const delegatedProps = reactiveOmit(props, 'class', 'variant')

provide(
  ACCORDION_VARIANT_KEY,
  computed(() => props.variant ?? 'default'),
)

const isBoxed = computed(() => props.variant === 'blended' || props.variant === 'blended-main')

function hasOpenItem(modelValue: unknown) {
  return Array.isArray(modelValue) ? modelValue.length > 0 : !!modelValue
}
</script>

<template>
  <Accordion
    v-slot="slotProps"
    v-bind="delegatedProps"
    :class="cn(gandalfAccordionVariants({ variant }), props.class)"
    @update:model-value="emits('update:modelValue', $event)"
  >
    <div
      v-if="isBoxed && hasOpenItem(slotProps.modelValue)"
      class="border-border-extra-loud overflow-hidden rounded-xl border"
    >
      <slot v-bind="slotProps" />
    </div>
    <slot v-else v-bind="slotProps" />
  </Accordion>
</template>
