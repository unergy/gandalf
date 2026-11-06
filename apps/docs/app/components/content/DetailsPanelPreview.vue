<script setup lang="ts">
import { CalendarDays, MessageSquare, Paperclip, SquareCheck, Trees } from 'lucide-vue-next'
import {
  GBadge,
  GButton,
  GDetailsPanel,
  GDetailsPanelBody,
  GDetailsPanelContent,
  GDetailsPanelDescription,
  GDetailsPanelFooter,
  GDetailsPanelHeader,
  GDetailsPanelTitle,
  GDetailsPanelTrigger,
  GVisualizationCard,
  GVisualizationCardField,
} from '@unergy/gandalf'

const props = withDefaults(defineProps<{ defaultOpen?: boolean }>(), { defaultOpen: false })
const open = ref(props.defaultOpen)

const comment = 'Special field meant to be filled with a comment, no more than 3 rows'
</script>

<template>
  <GDetailsPanel v-model:open="open">
    <GDetailsPanelTrigger as-child>
      <GButton variant="outline-primary">Open details</GButton>
    </GDetailsPanelTrigger>

    <GDetailsPanelContent>
      <GDetailsPanelHeader>
        <GDetailsPanelTitle>Item title</GDetailsPanelTitle>
        <GDetailsPanelDescription class="sr-only"
          >Details of the selected item</GDetailsPanelDescription
        >
      </GDetailsPanelHeader>

      <GDetailsPanelBody>
        <GVisualizationCard title="PANEL 1">
          <GVisualizationCardField label="Item">
            <template #icon><SquareCheck /></template>
            <GBadge color="action" size="sm"><SquareCheck />Label</GBadge>
          </GVisualizationCardField>
          <GVisualizationCardField label="Item" value="Value">
            <template #icon><SquareCheck /></template>
          </GVisualizationCardField>
        </GVisualizationCard>

        <GVisualizationCard title="PANEL 2">
          <GVisualizationCardField label="Item" value="Value">
            <template #icon><SquareCheck /></template>
          </GVisualizationCardField>
          <GVisualizationCardField label="Item">
            <template #icon><SquareCheck /></template>
            <span
              class="bg-default-muted text-default-bold flex size-6 items-center justify-center rounded-full text-xs font-bold"
              >AV</span
            >
          </GVisualizationCardField>
          <GVisualizationCardField label="Comment" :value="comment">
            <template #icon><MessageSquare /></template>
          </GVisualizationCardField>
        </GVisualizationCard>

        <GVisualizationCard title="OTRO">
          <GVisualizationCardField label="Visita" value="Forestal">
            <template #icon><Trees /></template>
          </GVisualizationCardField>
          <GVisualizationCardField label="Fecha de visita" placeholder="Sin definir">
            <template #icon><CalendarDays /></template>
          </GVisualizationCardField>
          <GVisualizationCardField label="Documentos adjuntos">
            <template #icon><Paperclip /></template>
            <div class="flex flex-1 flex-wrap gap-1">
              <GBadge variant="outlined" size="xs"><Paperclip />Autorización.pdf</GBadge>
              <GBadge variant="outlined" size="xs"><Paperclip />CTL</GBadge>
            </div>
          </GVisualizationCardField>
        </GVisualizationCard>
      </GDetailsPanelBody>

      <GDetailsPanelFooter>
        <GButton variant="outline-primary">Action 2</GButton>
        <GButton>Action 1</GButton>
      </GDetailsPanelFooter>
    </GDetailsPanelContent>
  </GDetailsPanel>
</template>
