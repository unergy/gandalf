<script setup lang="ts">
import { ref } from 'vue'
import { Building2, Factory, House, Sun } from 'lucide-vue-next'
import { GCardCheck, GCardToggleBox } from '@unergy-dev/gandalf'

const sectors = ref<Record<string, boolean>>({ homes: true, industry: false, commerce: false })
const solar = ref(true)
const wind = ref(false)
</script>

<template>
    <div class="not-prose border-border bg-muted/30 my-4 flex flex-col gap-6 rounded-lg border p-8">
        <div class="flex max-w-sm flex-col gap-3">
            <GCardCheck v-model="sectors.homes" label="Hogares"><template #icon><House /></template></GCardCheck>
            <GCardCheck v-model="sectors.industry" label="Industria"><template #icon><Factory /></template></GCardCheck>
            <GCardCheck v-model="sectors.commerce" label="Comercio" description="Oficinas y locales"><template #icon><Building2 /></template></GCardCheck>
        </div>
        <div class="flex gap-3">
            <GCardToggleBox v-model="solar" label="Solar" class="w-48"><template #icon><Sun /></template></GCardToggleBox>
            <GCardToggleBox v-model="wind" label="Eólica" class="w-48"><template #icon><Factory /></template></GCardToggleBox>
        </div>
    </div>
</template>
