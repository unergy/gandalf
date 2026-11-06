<script setup lang="ts">
import { ref } from 'vue'
import { Users } from 'lucide-vue-next'
import { GNavigationButton } from '@unergy-dev/gandalf'
import type { NavigationOptionGroup } from '@unergy-dev/gandalf'

const levels: NavigationOptionGroup[] = [
    { options: [{ label: 'Main level', value: 'main', description: 'Description for level' }] },
    {
        options: [
            { label: 'Sub level 1', value: 'sub-1', description: 'Description for sublevel' },
            { label: 'Sub level 2', value: 'sub-2', description: 'Description for sublevel' },
            { label: 'Sub level 3', value: 'sub-3', description: 'Description for sublevel' },
        ],
    },
]
const roles = [
    { label: 'Rol', value: 'rol' },
    { label: 'Administrador', value: 'admin' },
]

const level = ref('sub-1')
const role = ref('rol')
</script>

<template>
    <div class="not-prose border-border bg-muted/30 my-4 flex flex-wrap gap-4 rounded-lg border p-8">
        <GNavigationButton v-model="level" :options="levels" class="w-56" />
        <GNavigationButton v-model="role" :options="roles" color="success" class="w-56">
            <template #icon><Users /></template>
        </GNavigationButton>
    </div>
</template>
