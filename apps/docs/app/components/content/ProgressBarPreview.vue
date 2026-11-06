<script setup lang="ts">
import { GProgressBar } from '@unergy/gandalf'

const states = [
  { name: 'Zero', value: 0 },
  { name: 'Low', value: 25 },
  { name: 'Middle', value: 50 },
  { name: 'Long', value: 75 },
  { name: 'Completed', value: 100 },
]
</script>

<template>
  <div
    class="not-prose border-border bg-muted/30 my-4 flex flex-col gap-4 rounded-lg border p-8"
  >
    <div v-for="state in states" :key="state.name" class="flex items-center gap-4">
      <span class="text-base-foreground-extra-quiet w-20 text-right text-sm">{{ state.name }}</span>
      <GProgressBar :model-value="state.value" class="w-[159px]" />
    </div>
  </div>
</template>
