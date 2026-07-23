<script setup lang="ts">
import type { AccordionTriggerProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { AccordionTrigger } from '@/components/ui/accordion'
import { cn } from '@/lib/utils'

const props = defineProps<AccordionTriggerProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <AccordionTrigger v-bind="delegatedProps" :class="cn(props.class)">
    <slot />
    <template v-if="$slots.icon" #icon>
      <slot name="icon" />
    </template>
  </AccordionTrigger>
</template>
