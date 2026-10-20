<script setup lang="ts">
import { GToaster, gToast } from '@/components/gandalf/base/sonner'

const items: { label: string; color: keyof typeof gToast }[] = [
  { label: 'Default', color: 'default' },
  { label: 'Action', color: 'action' },
  { label: 'Information', color: 'information' },
  { label: 'Success', color: 'success' },
  { label: 'Warning', color: 'warning' },
  { label: 'Danger', color: 'destructive' },
]

function fire(color: keyof typeof gToast) {
  gToast[color]('Title', 'Description')
}
</script>

<template>
  <div class="not-prose border-border bg-muted/30 my-4 flex flex-wrap gap-2 rounded-lg border p-8">
    <button
      v-for="item in items"
      :key="item.color"
      type="button"
      class="border-border hover:bg-muted rounded-md border px-3 py-1.5 text-sm"
      @click="fire(item.color)"
    >
      {{ item.label }}
    </button>
    <GToaster />
  </div>
</template>
