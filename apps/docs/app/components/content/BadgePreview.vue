<script setup lang="ts">
import { GBadge } from '@unergy-dev/gandalf'
import { Sun } from 'lucide-vue-next'

const colors = ['default', 'action', 'information', 'success', 'warning', 'destructive'] as const

const customColors = [
  '#FFFFFF',
  '#C6EAFB',
  '#F7CADF',
  '#E8ED9E',
  '#CEE7C4',
  '#F18D91',
  '#1F2937',
] as const
</script>

<template>
  <div class="not-prose border-border bg-muted/30 my-4 rounded-lg border p-8">
    <div class="flex flex-col items-center gap-4">
      <!-- Tonal -->
      <div class="flex flex-wrap items-center justify-center gap-2">
        <GBadge v-for="color in colors" :key="color" :color="color">
          {{ color }}
        </GBadge>
      </div>
      <!-- Outlined -->
      <div class="flex flex-wrap items-center justify-center gap-2">
        <GBadge v-for="color in colors" :key="color" variant="outlined" :color="color">
          {{ color }}
        </GBadge>
      </div>
      <!-- Shapes, icon only, disabled -->
      <div class="flex flex-wrap items-center justify-center gap-2">
        <GBadge color="success">Rounded</GBadge>
        <GBadge color="success" shape="square">Square</GBadge>
        <GBadge color="action"><Sun /></GBadge>
        <GBadge color="action" disabled>Disabled</GBadge>
        <GBadge color="action" variant="outlined" disabled>Disabled</GBadge>
      </div>
      <!-- Sizes -->
      <div class="flex flex-wrap items-center justify-center gap-2">
        <GBadge color="information"><Sun /> md</GBadge>
        <GBadge color="information" size="sm"><Sun /> sm</GBadge>
        <GBadge color="information" size="xs"><Sun /> xs</GBadge>
      </div>
      <!-- Custom hex color -->
      <div class="flex flex-wrap items-center justify-center gap-2">
        <GBadge v-for="color in customColors" :key="color" :color="color">
          {{ color }}
        </GBadge>
      </div>
      <div class="flex flex-wrap items-center justify-center gap-2">
        <GBadge v-for="color in customColors" :key="color" variant="outlined" :color="color">
          {{ color }}
        </GBadge>
      </div>
    </div>
  </div>
</template>
