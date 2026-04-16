<script setup lang="ts">
import { ref } from 'vue'
import { Check, ChevronsUpDown } from 'lucide-vue-next'
import {
    GCombobox,
    GComboboxAnchor,
    GComboboxInput,
    GComboboxTrigger,
    GComboboxList,
    GComboboxViewport,
    GComboboxEmpty,
    GComboboxGroup,
    GComboboxItem,
    GComboboxItemIndicator,
} from '@/components/gandalf/combobox'

const selected = ref('')
const open = ref(false)

const frameworks = [
    { label: 'Next.js', value: 'nextjs' },
    { label: 'Nuxt', value: 'nuxt' },
    { label: 'Remix', value: 'remix' },
    { label: 'Astro', value: 'astro' },
]
</script>

<template>
    <div class="not-prose border-border bg-muted/30 my-4 flex items-center justify-center rounded-lg border p-8">
        <GCombobox v-model="selected" v-model:open="open" class="w-[250px]">
            <GComboboxAnchor>
                <GComboboxInput placeholder="Search framework..." />
                <GComboboxTrigger>
                    <ChevronsUpDown class="size-4 shrink-0 opacity-50" />
                </GComboboxTrigger>
            </GComboboxAnchor>
            <GComboboxList>
                <GComboboxViewport>
                    <GComboboxEmpty>No framework found.</GComboboxEmpty>
                    <GComboboxGroup heading="Frameworks">
                        <GComboboxItem v-for="fw in frameworks" :key="fw.value" :value="fw.value">
                            {{ fw.label }}
                            <GComboboxItemIndicator>
                                <Check class="size-4" />
                            </GComboboxItemIndicator>
                        </GComboboxItem>
                    </GComboboxGroup>
                </GComboboxViewport>
            </GComboboxList>
        </GCombobox>
    </div>
</template>
