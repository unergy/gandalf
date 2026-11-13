<script setup lang="ts">
import { BookCheck } from 'lucide-vue-next'
import { GAccordion, GAccordionContent, GAccordionItem, GAccordionTrigger } from '@unergy-dev/gandalf'
import type { GandalfAccordionType } from '@unergy-dev/gandalf'

const types: GandalfAccordionType[] = ['visualization', 'table']
const subitems = ['Subaccordeon 1', 'Subaccordeon 2', 'Subaccordeon 3']
</script>

<template>
  <div class="not-prose border-border bg-base-base my-4 flex flex-col gap-8 rounded-lg border p-8">
    <div v-for="type in types" :key="type" class="flex flex-col gap-2">
      <p class="text-muted-foreground font-mono text-xs">variant="main" · type="{{ type }}"</p>
      <GAccordion type="multiple" :default-value="['open']">
        <GAccordionItem value="closed" :type="type">
          <GAccordionTrigger label="Activo" count="12">Proyectos</GAccordionTrigger>
          <GAccordionContent>
            <p class="text-base-foreground px-4 pb-4 text-sm">Contenido del acordeón.</p>
          </GAccordionContent>
        </GAccordionItem>
        <GAccordionItem value="open" :type="type">
          <GAccordionTrigger label="Activo" count="12">Trámites</GAccordionTrigger>
          <GAccordionContent>
            <p class="text-base-foreground px-4 py-4 text-sm">Contenido del acordeón.</p>
          </GAccordionContent>
        </GAccordionItem>
        <GAccordionItem value="disabled" :type="type" disabled>
          <GAccordionTrigger label="Activo" count="12">Deshabilitado</GAccordionTrigger>
          <GAccordionContent />
        </GAccordionItem>
      </GAccordion>
    </div>

    <div class="flex flex-col gap-2">
      <p class="text-muted-foreground font-mono text-xs">
        variant="blended" · category="main" con category="default" dentro
      </p>
      <GAccordion variant="blended" type="single" collapsible default-value="main">
        <GAccordionItem value="main">
          <GAccordionTrigger label="Label">
            Main accordeon
            <template #label-icon><BookCheck /></template>
          </GAccordionTrigger>
          <GAccordionContent>
            <GAccordion variant="blended" category="default" type="multiple" :default-value="['0']">
              <GAccordionItem v-for="(title, i) in subitems" :key="title" :value="String(i)">
                <GAccordionTrigger label="Label">
                  {{ title }}
                  <template #label-icon><BookCheck /></template>
                </GAccordionTrigger>
                <GAccordionContent>
                  <p class="text-base-foreground p-4 text-sm">Contenido de {{ title }}.</p>
                </GAccordionContent>
              </GAccordionItem>
            </GAccordion>
          </GAccordionContent>
        </GAccordionItem>
      </GAccordion>
    </div>
  </div>
</template>
