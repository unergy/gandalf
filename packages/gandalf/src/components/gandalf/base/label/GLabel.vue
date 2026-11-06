<script setup lang="ts">
import type { LabelProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { gandalfLabelVariants } from './index'

const props = defineProps<
  LabelProps & {
    class?: HTMLAttributes['class']
    required?: boolean
    disabled?: boolean
  }
>()

const delegatedProps = reactiveOmit(props, 'class', 'required', 'disabled')
</script>

<template>
  <Label v-bind="delegatedProps" :class="cn(gandalfLabelVariants({ disabled }), props.class)">
    <slot />
    <span
      v-if="required"
      :class="disabled ? 'text-muted-foreground-quiet' : 'text-destructive-bold'"
      aria-hidden="true"
      >*</span
    >
    <!-- Figma's "more info" icon, 6px after the label -->
    <span
      v-if="$slots.info"
      class="text-base-foreground-extra-quiet ml-1 inline-flex font-normal [&_svg]:size-3.5"
    >
      <slot name="info" />
    </span>
  </Label>
</template>
