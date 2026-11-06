<script setup lang="ts">
const semanticColors = [
  {
    label: 'Default',
    token: 'default',
    tiers: [
      { label: 'muted', cls: 'bg-default-muted' },
      { label: 'base', cls: 'bg-default' },
      { label: 'bold', cls: 'bg-default-bold' },
    ],
  },
  {
    label: 'Action',
    token: 'action',
    tiers: [
      { label: 'muted', cls: 'bg-action-muted' },
      { label: 'base', cls: 'bg-action' },
      { label: 'bold', cls: 'bg-action-bold' },
    ],
  },
  {
    label: 'Information',
    token: 'information',
    tiers: [
      { label: 'muted', cls: 'bg-information-muted' },
      { label: 'base', cls: 'bg-information' },
      { label: 'bold', cls: 'bg-information-bold' },
    ],
  },
  {
    label: 'Success',
    token: 'success',
    tiers: [
      { label: 'muted', cls: 'bg-success-muted' },
      { label: 'base', cls: 'bg-success' },
      { label: 'bold', cls: 'bg-success-bold' },
    ],
  },
  {
    label: 'Warning',
    token: 'warning',
    tiers: [
      { label: 'muted', cls: 'bg-warning-muted' },
      { label: 'base', cls: 'bg-warning' },
      { label: 'bold', cls: 'bg-warning-bold' },
    ],
  },
  {
    label: 'Destructive',
    token: 'destructive',
    tiers: [
      { label: 'muted', cls: 'bg-destructive-muted' },
      { label: 'base', cls: 'bg-destructive' },
      { label: 'bold', cls: 'bg-destructive-bold' },
    ],
  },
]

const bniColors = [
  { label: 'Background', token: 'bni-background', cls: 'bg-bni-background' },
  { label: 'Border', token: 'bni-border', cls: 'bg-bni-border' },
  { label: 'Border Loud', token: 'bni-border-loud', cls: 'bg-bni-border-loud' },
  { label: 'Input Fill', token: 'bni-input', cls: 'bg-bni-input' },
  { label: 'Focus Ring', token: 'bni-ring', cls: 'bg-bni-ring' },
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
