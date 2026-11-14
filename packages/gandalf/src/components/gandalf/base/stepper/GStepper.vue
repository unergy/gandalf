<script setup lang="ts">
import type { StepperRootEmits, StepperRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { Stepper } from '@/components/ui/stepper'
import { cn } from '@/lib/utils'
import { gandalfStepperVariants } from './index'

// Figma: Stepper. Figma only draws the vertical stepper, so the orientation is fixed.
// Reka props whose default is not `false` stay undefined, so Reka applies its own default.
const props = withDefaults(
  defineProps<Omit<StepperRootProps, 'orientation'> & { class?: HTMLAttributes['class'] }>(),
  { linear: undefined, class: undefined },
)

const emits = defineEmits<StepperRootEmits>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <Stepper
    v-slot="slotProps"
    v-bind="delegatedProps"
    orientation="vertical"
    :class="cn(gandalfStepperVariants(), props.class)"
    @update:model-value="emits('update:modelValue', $event)"
  >
    <slot v-bind="slotProps" />
  </Stepper>
</template>
