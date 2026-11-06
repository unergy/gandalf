<script setup lang="ts">
import { BookCheck, ChevronDown } from 'lucide-vue-next'
import { ref } from 'vue'
import { GInput, GLabel } from '@unergy-dev/gandalf'

const name = ref('')
const email = ref('ana@')
</script>

<template>
    <div class="not-prose border-border bg-muted/30 my-4 flex flex-col gap-6 rounded-lg border p-8">
        <div class="flex flex-col gap-2">
            <GLabel for="preview-name">Name</GLabel>
            <GInput id="preview-name" v-model="name" placeholder="Ana Gómez" />
        </div>
        <div class="flex flex-col gap-2">
            <GLabel for="preview-sm">Small</GLabel>
            <GInput id="preview-sm" size="sm" placeholder="32px" />
        </div>
        <div class="flex flex-col gap-2">
            <GLabel for="preview-xs">Extra small</GLabel>
            <GInput id="preview-xs" size="xs" placeholder="24px" />
        </div>
        <div class="flex flex-col gap-2">
            <GLabel for="preview-icons">With icons</GLabel>
            <GInput id="preview-icons" placeholder="Input text">
                <template #leading><BookCheck /></template>
                <template #trailing><ChevronDown /></template>
            </GInput>
            <GInput size="sm" placeholder="sm">
                <template #leading><BookCheck /></template>
                <template #trailing><ChevronDown /></template>
            </GInput>
            <GInput size="xs" placeholder="xs">
                <template #leading><BookCheck /></template>
                <template #trailing><ChevronDown /></template>
            </GInput>
            <GInput disabled placeholder="Disabled">
                <template #leading><BookCheck /></template>
            </GInput>
            <GInput aria-invalid="true" placeholder="Error">
                <template #leading><BookCheck /></template>
            </GInput>
        </div>
        <div class="flex flex-col gap-2">
            <GLabel for="preview-invalid">Invalid</GLabel>
            <GInput id="preview-invalid" v-model="email" type="email" aria-invalid="true" />
        </div>
        <div class="flex flex-col gap-2">
            <GLabel for="preview-disabled">Disabled</GLabel>
            <GInput id="preview-disabled" disabled placeholder="Not editable" />
        </div>
    </div>
</template>
