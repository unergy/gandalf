<script setup lang="ts">
import type { StepperItemProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { Check } from 'lucide-vue-next'
import {
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from '@/components/ui/stepper'
import { cn } from '@/lib/utils'
import {
  gandalfStepperConnectorVariants,
  gandalfStepperIndicatorVariants,
  gandalfStepperItemVariants,
  gandalfStepperTitleVariants,
  gandalfStepperTriggerVariants,
} from './index'

// Figma: Stepper → Step and its title. The state comes from GStepper's v-model: earlier steps are
// Done, the current one is Active and later ones are Current. `disabled` draws State=Disabled.
const props = defineProps<
  StepperItemProps & {
    title?: string
    class?: HTMLAttributes['class']
  }
>()

const delegatedProps = reactiveOmit(props, 'class', 'title')
</script>

<template>
  <StepperItem
    v-slot="slotProps"
    v-bind="delegatedProps"
    :class="cn(gandalfStepperItemVariants(), props.class)"
  >
    <StepperTrigger :class="gandalfStepperTriggerVariants()">
      <StepperIndicator :class="gandalfStepperIndicatorVariants()">
        <slot name="indicator" v-bind="slotProps">
          <!-- Done shows a check, and its number again on hover and press -->
          <span
            class="group-data-[state=completed]:hidden group-data-[state=completed]:group-hover/step:inline"
          >
            {{ step }}
          </span>
          <Check
            class="hidden size-4 group-data-[state=completed]:block group-data-[state=completed]:group-hover/step:hidden"
          />
        </slot>
      </StepperIndicator>
      <StepperTitle :class="gandalfStepperTitleVariants()">
        <slot v-bind="slotProps">{{ title }}</slot>
      </StepperTitle>
    </StepperTrigger>
    <StepperSeparator data-slot="stepper-connector" :class="gandalfStepperConnectorVariants()" />
  </StepperItem>
</template>
