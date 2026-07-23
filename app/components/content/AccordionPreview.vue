<script setup lang="ts">
import {
  GAccordion,
  GAccordionContent,
  GAccordionItem,
  GAccordionTrigger,
} from '@/components/gandalf/base/accordion'

const items = [
  {
    value: 'item-1',
    title: 'Is it accessible?',
    content: 'Yes. It adheres to the WAI-ARIA design pattern.',
  },
  {
    value: 'item-2',
    title: 'Is it styled?',
    content: 'Yes. It comes with default styles that match the rest of the design system.',
  },
  {
    value: 'item-3',
    title: 'Is it animated?',
    content: 'Yes. It is animated by default, but you can disable it if you prefer.',
  },
]
</script>

<template>
  <div class="not-prose border-border bg-muted/30 my-4 rounded-lg border p-8">
    <GAccordion type="single" collapsible default-value="item-1" class="w-full">
      <GAccordionItem v-for="item in items" :key="item.value" :value="item.value">
        <GAccordionTrigger>{{ item.title }}</GAccordionTrigger>
        <GAccordionContent>{{ item.content }}</GAccordionContent>
      </GAccordionItem>
    </GAccordion>
  </div>
</template>
