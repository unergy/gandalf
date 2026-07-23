<script setup lang="ts">
import type { GandalfAccordionVariant } from '@/components/gandalf/base/accordion'
import {
  GAccordion,
  GAccordionContent,
  GAccordionItem,
  GAccordionTrigger,
} from '@/components/gandalf/base/accordion'

const variants: GandalfAccordionVariant[] = ['default', 'layout', 'blended', 'blended-main']

const items = [
  {
    value: 'item-1',
    title: 'Is it accessible?',
    content: 'Yes. It adheres to the WAI-ARIA design pattern.',
  },
]
</script>

<template>
  <div class="not-prose border-border bg-muted/30 my-4 flex flex-col gap-8 rounded-lg border p-8">
    <div v-for="variant in variants" :key="variant" class="flex flex-col gap-2">
      <p class="text-muted-foreground font-mono text-xs">{{ variant }}</p>
      <GAccordion type="single" collapsible default-value="item-1" :variant="variant">
        <GAccordionItem v-for="item in items" :key="item.value" :value="item.value">
          <GAccordionTrigger>{{ item.title }}</GAccordionTrigger>
          <GAccordionContent>{{ item.content }}</GAccordionContent>
        </GAccordionItem>
      </GAccordion>
    </div>
  </div>
</template>
