<script setup lang="ts">
import type { AccordionItemProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { AccordionItem } from '@/components/ui/accordion'
import { cn } from '@/lib/utils'

const props = defineProps<AccordionItemProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <AccordionItem v-slot="slotProps" v-bind="delegatedProps" :class="cn(props.class)">
    <slot v-bind="slotProps" />
  </AccordionItem>
</template>
