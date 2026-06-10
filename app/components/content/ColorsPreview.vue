<script setup lang="ts">
const semanticColors = [
  {
    label: 'Default',
    token: 'default',
    tiers: [
      { label: 'muted', cls: 'bg-slate-100' },
      { label: 'base', cls: 'bg-slate-600' },
      { label: 'bold', cls: 'bg-slate-700' },
    ],
  },
  {
    label: 'Action',
    token: 'action',
    tiers: [
      { label: 'muted', cls: 'bg-blue-100' },
      { label: 'base', cls: 'bg-blue-600' },
      { label: 'bold', cls: 'bg-blue-700' },
    ],
  },
  {
    label: 'Information',
    token: 'information',
    tiers: [
      { label: 'muted', cls: 'bg-purple-100' },
      { label: 'base', cls: 'bg-purple-600' },
      { label: 'bold', cls: 'bg-purple-700' },
    ],
  },
  {
    label: 'Success',
    token: 'success',
    tiers: [
      { label: 'muted', cls: 'bg-emerald-100' },
      { label: 'base', cls: 'bg-emerald-600' },
      { label: 'bold', cls: 'bg-emerald-700' },
    ],
  },
  {
    label: 'Warning',
    token: 'warning',
    tiers: [
      { label: 'muted', cls: 'bg-amber-100' },
      { label: 'base', cls: 'bg-amber-600' },
      { label: 'bold', cls: 'bg-amber-700' },
    ],
  },
  {
    label: 'Destructive',
    token: 'destructive',
    tiers: [
      { label: 'muted', cls: 'bg-red-100' },
      { label: 'base', cls: 'bg-red-600' },
      { label: 'bold', cls: 'bg-red-700' },
    ],
  },
]

const bniColors = [
  { label: 'Background', token: 'bni-background', cls: 'bg-white' },
  { label: 'Border', token: 'bni-border', cls: 'bg-slate-200' },
  { label: 'Border Loud', token: 'bni-border-loud', cls: 'bg-slate-500' },
  { label: 'Input Fill', token: 'bni-input', cls: 'bg-slate-100' },
  { label: 'Focus Ring', token: 'bni-ring', cls: 'bg-purple-400' },
]
</script>

<template>
  <div class="not-prose space-y-8">
    <!-- Semantic Colors -->
    <div>
      <p class="text-muted-foreground mb-4 text-xs font-semibold tracking-widest uppercase">
        Semantic Colors
      </p>
      <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="c in semanticColors" :key="c.token">
          <p class="text-foreground mb-2 text-sm font-medium">{{ c.label }}</p>
          <div class="flex gap-1">
            <div
              v-for="tier in c.tiers"
              :key="tier.label"
              :class="tier.label === 'muted' ? 'flex-1' : 'flex-2'"
              class="space-y-1.5"
            >
              <div
                :class="[
                  tier.cls,
                  'h-10 rounded',
                  tier.label === 'muted' ? 'border border-border' : '',
                ]"
              />
              <p class="text-muted-foreground font-mono text-[10px]">
                {{ tier.label === 'base' ? c.token : tier.label }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- BNI / Input Surface Colors -->
    <div>
      <p class="text-muted-foreground mb-4 text-xs font-semibold tracking-widest uppercase">
        Input Surface Colors
      </p>
      <div class="flex flex-wrap gap-3">
        <div v-for="c in bniColors" :key="c.token" class="w-28 space-y-1.5">
          <div :class="[c.cls, 'border-border h-10 rounded border']" />
          <p class="text-foreground text-xs font-medium">{{ c.label }}</p>
          <p class="text-muted-foreground font-mono text-[10px]">{{ c.token }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
