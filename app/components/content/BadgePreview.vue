<script setup lang="ts">
import { GBadge } from '@/components/gandalf/base/badge'
import { Sun } from 'lucide-vue-next'

const colors = ['default', 'action', 'information', 'success', 'warning', 'destructive'] as const
</script>

<template>
  <div class="not-prose border-border bg-muted/30 my-4 rounded-lg border p-8">
    <div class="flex flex-col items-center gap-4">
      <!-- Default variant -->
      <div class="flex flex-wrap items-center justify-center gap-2">
        <GBadge v-for="color in colors" :key="color" :color="color">
          {{ color }}
        </GBadge>
      </div>
      <!-- Outline variant -->
      <div class="flex flex-wrap items-center justify-center gap-2">
        <GBadge v-for="color in colors" :key="color" variant="outline" :color="color">
          {{ color }}
        </GBadge>
      </div>
      <!-- Shapes & icon -->
      <div class="flex flex-wrap items-center justify-center gap-2">
        <GBadge color="success">Rounded</GBadge>
        <GBadge color="success" shape="square">Square</GBadge>
        <GBadge color="action" size="icon">
          <Sun class="size-3" />
        </GBadge>
      </div>
    </div>
  </div>
</template>
