<script setup lang="ts">
const semanticColors = [
  { key: 'default', label: 'Default', resolves: 'slate' },
  { key: 'action', label: 'Action', resolves: 'blue' },
  { key: 'information', label: 'Information', resolves: 'purple' },
  { key: 'success', label: 'Success', resolves: 'emerald' },
  { key: 'warning', label: 'Warning', resolves: 'amber' },
  { key: 'destructive', label: 'Destructive', resolves: 'red' },
] as const

const bniColors = [
  { key: 'bni-background', label: 'Background', resolves: 'white' },
  { key: 'bni-border', label: 'Border', resolves: 'slate-200' },
  { key: 'bni-border-loud', label: 'Border Loud', resolves: 'slate-500' },
  { key: 'bni-input', label: 'Input Fill', resolves: 'slate-100' },
  { key: 'bni-ring', label: 'Focus Ring', resolves: 'purple-400' },
] as const
</script>

<template>
  <div class="not-prose space-y-8">
    <!-- Semantic Colors -->
    <div>
      <p class="text-muted-foreground mb-4 text-xs font-semibold tracking-widest uppercase">
        Semantic Colors
      </p>
      <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="c in semanticColors" :key="c.key">
          <p class="text-foreground mb-2 text-sm font-medium">{{ c.label }}</p>
          <div class="flex gap-1">
            <!-- muted -->
            <div class="flex-1 space-y-1.5">
              <div
                :style="{ background: `var(--color-${c.key}-muted)` }"
                class="border-border h-10 rounded border"
              />
              <p class="text-muted-foreground font-mono text-[10px]">muted</p>
            </div>
            <!-- base -->
            <div class="flex-[2] space-y-1.5">
              <div
                :style="{ background: `var(--color-${c.key})` }"
                class="h-10 rounded"
              />
              <p class="text-muted-foreground font-mono text-[10px]">{{ c.key }}</p>
            </div>
            <!-- bold -->
            <div class="flex-[2] space-y-1.5">
              <div
                :style="{ background: `var(--color-${c.key}-bold)` }"
                class="h-10 rounded"
              />
              <p class="text-muted-foreground font-mono text-[10px]">bold</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- BNI Colors -->
    <div>
      <p class="text-muted-foreground mb-4 text-xs font-semibold tracking-widest uppercase">
        Input Surface Colors
      </p>
      <div class="flex flex-wrap gap-3">
        <div v-for="c in bniColors" :key="c.key" class="w-28 space-y-1.5">
          <div
            :style="{ background: `var(--color-${c.key})` }"
            class="border-border h-10 rounded border"
          />
          <p class="text-foreground text-xs font-medium">{{ c.label }}</p>
          <p class="text-muted-foreground font-mono text-[10px]">{{ c.key }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
