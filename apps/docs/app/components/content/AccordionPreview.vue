<script setup lang="ts">
import type {
  GandalfAccordionIndicatorColor,
  GandalfAccordionIndicatorPosition,
  GandalfAccordionVariant,
} from '@/components/gandalf/base/accordion'
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

const indicators: {
  label: string
  color: GandalfAccordionIndicatorColor
  position: GandalfAccordionIndicatorPosition
}[] = [
  { label: 'default · end', color: 'default', position: 'end' },
  { label: 'action · end', color: 'action', position: 'end' },
  { label: 'default · start', color: 'default', position: 'start' },
  { label: 'action · start', color: 'action', position: 'start' },
]
</script>

<template>
  <div class="not-prose border-border bg-muted/50 my-4 flex flex-col gap-8 rounded-lg border p-8">
    <div v-for="variant in variants" :key="variant" class="flex flex-col gap-2">
      <p class="text-muted-foreground font-mono text-xs">{{ variant }}</p>
      <GAccordion type="single" collapsible default-value="item-1" :variant="variant">
        <GAccordionItem v-for="item in items" :key="item.value" :value="item.value">
          <GAccordionTrigger>{{ item.title }}</GAccordionTrigger>
          <GAccordionContent>{{ item.content }}</GAccordionContent>
        </GAccordionItem>
      </GAccordion>
    </div>

    <div class="flex flex-col gap-2">
      <p class="text-muted-foreground font-mono text-xs">indicator color &amp; position</p>
      <div class="grid grid-cols-2 gap-6">
        <div v-for="indicator in indicators" :key="indicator.label" class="flex flex-col gap-2">
          <p class="text-muted-foreground font-mono text-xs">{{ indicator.label }}</p>
          <GAccordion type="single" collapsible default-value="item-1">
            <GAccordionItem value="item-1">
              <GAccordionTrigger
                :indicator-color="indicator.color"
                :indicator-position="indicator.position"
              >
                {{ items[0]?.title }}
              </GAccordionTrigger>
              <GAccordionContent>{{ items[0]?.content }}</GAccordionContent>
            </GAccordionItem>
          </GAccordion>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-2">
      <p class="text-muted-foreground font-mono text-xs">indicator-label slot</p>
      <GAccordion type="single" collapsible>
        <GAccordionItem v-slot="{ open }" value="item-1">
          <GAccordionTrigger indicator-color="action">
            {{ items[0]?.title }}
            <template #indicator-label>{{ open ? 'Ocultar' : 'Ver más' }}</template>
          </GAccordionTrigger>
          <GAccordionContent>{{ items[0]?.content }}</GAccordionContent>
        </GAccordionItem>
      </GAccordion>
    </div>
  </div>
</template>
