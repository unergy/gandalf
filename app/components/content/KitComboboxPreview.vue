<script setup lang="ts">
import { ref } from 'vue'
import { GKitCombobox } from '@/components/gandalf/kit/combobox'
import type { ComboboxOptions } from '@/components/gandalf/kit/combobox'

const framework = ref<string | undefined>('nuxt')
const cities = ref<string[]>(['bog'])

const frameworks: ComboboxOptions = [
  { label: 'Next.js', value: 'nextjs', description: 'The React framework', keywords: ['react'] },
  { label: 'Nuxt', value: 'nuxt', description: 'The intuitive Vue framework', keywords: ['vue'] },
  { label: 'Remix', value: 'remix', description: 'Full stack web framework' },
  { label: 'Astro', value: 'astro', description: 'The web framework for content sites' },
  { label: 'SvelteKit', value: 'sveltekit', disabled: true },
]

// Accented labels on purpose: typing `bogota` or `medellin` finds them.
const grouped: ComboboxOptions = [
  {
    label: 'Andina',
    options: [
      { label: 'Bogotá', value: 'bog', color: '#6366f1' },
      { label: 'Medellín', value: 'mde', color: '#10b981' },
      { label: 'Manizales', value: 'mzl', color: '#f59e0b' },
    ],
  },
  {
    label: 'Caribe',
    options: [
      { label: 'Barranquilla', value: 'baq', color: '#ef4444' },
      { label: 'Santa Marta', value: 'smr', color: '#0ea5e9' },
    ],
  },
]
</script>

<template>
  <div
    class="not-prose border-border bg-muted/30 my-4 grid gap-6 rounded-lg border p-8 sm:grid-cols-2"
  >
    <div class="space-y-2">
      <p class="text-muted-foreground text-xs font-medium">Single, clearable</p>
      <GKitCombobox
        v-model="framework"
        :options="frameworks"
        clearable
        placeholder="Select a framework..."
        search-placeholder="Search framework..."
      />
    </div>

    <div class="space-y-2">
      <p class="text-muted-foreground text-xs font-medium">Multiple, grouped</p>
      <GKitCombobox
        v-model="cities"
        :options="grouped"
        multiple
        clearable
        :max-display="2"
        placeholder="Select cities..."
        search-placeholder="Try 'bogota'..."
        empty-message="No city found."
      />
    </div>
  </div>
</template>
