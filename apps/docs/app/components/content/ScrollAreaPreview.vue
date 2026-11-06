<script setup lang="ts">
import { GScrollArea } from '@unergy/gandalf'

const tags = Array.from({ length: 24 }, (_, i) => `v1.2.0-beta.${24 - i}`)
const months = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
]
</script>

<template>
  <div class="not-prose border-border bg-muted/30 my-4 flex flex-wrap items-start gap-8 rounded-lg border p-8">
    <!-- Vertical, the Figma Type=Vertical bar -->
    <GScrollArea
      type="always"
      class="bg-bni-background h-56 w-56 rounded-lg border border-bni-border-loud"
    >
      <div class="flex flex-col gap-2 p-4">
        <span
          v-for="tag in tags"
          :key="tag"
          class="text-sm text-base-foreground"
        >{{ tag }}</span>
      </div>
    </GScrollArea>

    <!-- Horizontal, the Figma Type=Horizontal bar -->
    <GScrollArea
      type="always"
      orientation="horizontal"
      class="bg-bni-background w-80 rounded-lg border border-bni-border-loud"
    >
      <div class="flex w-max gap-3 p-4">
        <span
          v-for="month in months"
          :key="month"
          class="rounded-md bg-base-loud px-3 py-1 text-sm whitespace-nowrap text-base-foreground"
        >{{ month }}</span>
      </div>
    </GScrollArea>
  </div>
</template>
