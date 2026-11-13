<script setup lang="ts">
import { BookCheck, ChevronDown, MessageCircle } from 'lucide-vue-next'
import {
    GAccordion,
    GAccordionContent,
    GAccordionItem,
    GAccordionTrigger,
    GBadge,
    GVisualizationCard,
    GVisualizationCardField,
    GVisualizationLayoutCard,
    GVisualizationLayoutField,
} from '@unergy-dev/gandalf'
</script>

<template>
    <div class="not-prose border-border bg-muted/30 my-4 flex flex-col gap-8 rounded-lg border p-8">
        <GVisualizationCard class="max-w-[392px]">
            <GVisualizationCardField label="Contrato" value="CT-2026-0184">
                <template #icon><BookCheck /></template>
            </GVisualizationCardField>
            <GVisualizationCardField label="Responsable">
                <template #icon><BookCheck /></template>
                <span
                    class="bg-default-muted text-default-bold flex size-6 items-center justify-center rounded-full text-xs font-bold"
                    >EV</span
                >
            </GVisualizationCardField>
            <GVisualizationCardField label="Estado">
                <template #icon><BookCheck /></template>
                <GBadge color="action" size="sm">En revisión</GBadge>
            </GVisualizationCardField>
            <GVisualizationCardField
                label="Comentario"
                value="Special field meant to be filled with a comment: it wraps and is cut after three lines, as in the design."
            >
                <template #icon><MessageCircle /></template>
            </GVisualizationCardField>
        </GVisualizationCard>

        <GAccordion type="single" collapsible default-value="tramite">
            <GAccordionItem value="tramite">
                <GAccordionTrigger label="Legalización" :count="123">Trámite</GAccordionTrigger>
                <GAccordionContent>
        <GVisualizationLayoutCard :columns="4">
            <GVisualizationLayoutField label="Proyecto" value="Solar Palmira">
                <template #icon><BookCheck /></template>
            </GVisualizationLayoutField>
            <GVisualizationLayoutField label="Estado">
                <template #icon><BookCheck /></template>
                <GBadge color="warning">No contesta<ChevronDown /></GBadge>
            </GVisualizationLayoutField>
            <GVisualizationLayoutField label="Responsable">
                <template #icon><BookCheck /></template>
                <span
                    class="bg-default-muted text-default-bold flex size-8 items-center justify-center rounded-full text-sm font-bold"
                    >EV</span
                >
            </GVisualizationLayoutField>
            <GVisualizationLayoutField label="Potencia" value="120 kWp">
                <template #icon><BookCheck /></template>
            </GVisualizationLayoutField>
        </GVisualizationLayoutCard>
                </GAccordionContent>
            </GAccordionItem>
        </GAccordion>
    </div>
</template>
