<script setup lang="ts">
import { ref } from 'vue'
import { FileCheck, Image } from 'lucide-vue-next'
import { GCardToggle } from '@unergy-dev/gandalf'
import type { GandalfCardToggleColor } from '@unergy-dev/gandalf'

const items: { id: string; title: string; description: string; color: GandalfCardToggleColor }[] = [
    { id: 'item-1', title: 'Item 1', description: 'Description for a toggle card', color: 'default' },
    { id: 'item-2', title: 'Item 2', description: 'Truncated description for a toggle card that does not fit', color: 'action' },
    { id: 'item-3', title: 'Item 3', description: 'Description for a toggle card', color: 'information' },
    { id: 'item-4', title: 'Item 4', description: 'Description for a toggle card', color: 'success' },
]

const selected = ref<string | null>('item-1')
const report = ref(false)
</script>

<template>
    <div class="not-prose border-border bg-muted/30 my-4 flex flex-col gap-6 rounded-lg border p-8">
        <div class="bg-base-base flex max-w-sm flex-col gap-1 rounded-2xl p-4">
            <GCardToggle
                v-for="item in items"
                :key="item.id"
                :title="item.title"
                :description="item.description"
                :color="item.color"
                :model-value="selected === item.id"
                @update:model-value="selected = $event ? item.id : null"
            >
                <template #avatar><FileCheck /></template>
                <template #complementary><Image /> 12</template>
            </GCardToggle>
        </div>

        <div class="max-w-sm">
            <GCardToggle v-model="report" type="report" title="Report" color="destructive">
                <template #avatar><FileCheck /></template>
                <template #complementary><Image /> 12</template>
            </GCardToggle>
        </div>
    </div>
</template>
