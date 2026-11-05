<script setup lang="ts">
import { ref } from 'vue'
import { Download, EllipsisVertical } from 'lucide-vue-next'
import { GButton, GFilesCard } from '@unergy/gandalf'

const folders = ['Trámites 2026', 'Contratos', 'Facturas', 'Reportes']
const files = [
    { title: 'Tramite4.xlsx', extension: 'xlsx' },
    { title: 'Contrato marco.pdf', extension: 'pdf' },
]

const selectedFolder = ref<string | null>('Contratos')
const selectedFile = ref<string | null>(null)
</script>

<template>
    <div class="not-prose border-border bg-muted/30 my-4 flex flex-col gap-6 rounded-lg border p-8">
        <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <GFilesCard
                v-for="folder in folders"
                :key="folder"
                :title="folder"
                file-count="12 files"
                :model-value="selectedFolder === folder"
                @update:model-value="selectedFolder = $event ? folder : null"
            >
                <template #actions>
                    <GButton variant="ghost-primary" size="xs" aria-label="More actions"><EllipsisVertical /></GButton>
                </template>
            </GFilesCard>
        </div>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <GFilesCard
                v-for="file in files"
                :key="file.title"
                type="file"
                :title="file.title"
                :extension="file.extension"
                :model-value="selectedFile === file.title"
                @update:model-value="selectedFile = $event ? file.title : null"
            >
                <template #actions>
                    <GButton variant="ghost-primary" size="xs" aria-label="Download"><Download /></GButton>
                </template>
            </GFilesCard>
        </div>
    </div>
</template>
