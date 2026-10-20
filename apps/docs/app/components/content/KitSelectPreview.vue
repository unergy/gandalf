<script setup lang="ts">
import { ref } from 'vue'
import { GKitSelect } from '@/components/gandalf/kit/select'
import type { SelectOptions } from '@/components/gandalf/kit/select'

const plan = ref<string | undefined>('pro')
const status = ref<string | undefined>()
const regions = ref<string[]>(['bog', 'mde'])

const plans: SelectOptions = [
  { label: 'Free', value: 'free', description: 'Up to 3 projects' },
  { label: 'Pro', value: 'pro', description: 'Unlimited projects' },
  { label: 'Enterprise', value: 'enterprise', description: 'Custom limits and SSO' },
]

const statuses: SelectOptions = [
  { label: 'Pagada', value: 'paid', color: '#10b981' },
  { label: 'Pendiente', value: 'pending', color: '#f59e0b' },
  { label: 'Vencida', value: 'overdue', color: '#ef4444' },
  { label: 'Anulada', value: 'void', color: '#94a3b8', disabled: true },
]

const regionOptions: SelectOptions = [
  {
    label: 'Andina',
    options: [
      { label: 'Bogotá', value: 'bog' },
      { label: 'Medellín', value: 'mde' },
      { label: 'Manizales', value: 'mzl' },
    ],
  },
  {
    label: 'Caribe',
    options: [
      { label: 'Barranquilla', value: 'baq' },
      { label: 'Santa Marta', value: 'smr' },
    ],
  },
]
</script>

<template>
  <div
    class="not-prose border-border bg-muted/30 my-4 grid gap-6 rounded-lg border p-8 sm:grid-cols-3"
  >
    <div class="space-y-2">
      <p class="text-muted-foreground text-xs font-medium">With descriptions</p>
      <GKitSelect v-model="plan" :options="plans" clearable placeholder="Select a plan..." />
    </div>

    <div class="space-y-2">
      <p class="text-muted-foreground text-xs font-medium">With colors</p>
      <GKitSelect v-model="status" :options="statuses" placeholder="Estado..." />
    </div>

    <div class="space-y-2">
      <p class="text-muted-foreground text-xs font-medium">Multiple, grouped</p>
      <GKitSelect
        v-model="regions"
        :options="regionOptions"
        multiple
        clearable
        :max-display="2"
        placeholder="Select regions..."
      />
    </div>
  </div>
</template>
