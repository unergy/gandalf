<script setup lang="ts">
import type { AccordionContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { AccordionContent } from '@/components/ui/accordion'
import { cn } from '@/lib/utils'

const props = defineProps<AccordionContentProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <!-- Figma draws the header only: the content has no padding of its own. -->
  <AccordionContent v-bind="delegatedProps" :class="cn('pb-0', props.class)">
    <slot />
  </AccordionContent>
</template>
