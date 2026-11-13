<script setup lang="ts">
import { GToast, GToaster, gToast } from '@unergy-dev/gandalf'

const items: { label: string; color: keyof typeof gToast }[] = [
  { label: 'Default', color: 'default' },
  { label: 'Action', color: 'action' },
  { label: 'Information', color: 'information' },
  { label: 'Success', color: 'success' },
  { label: 'Warning', color: 'warning' },
  { label: 'Destructive', color: 'destructive' },
]

function fire(color: keyof typeof gToast) {
  gToast[color]('Title', 'Description')
}
</script>

<template>
  <div class="not-prose border-border bg-muted/30 my-4 flex flex-col items-start gap-6 rounded-lg border p-8">
    <div class="flex flex-col gap-6">
      <GToast
        v-for="item in items"
        :key="item.color"
        :type="item.color"
        title="Title"
        description="Description"
      />
    </div>
    <div class="flex flex-wrap gap-2">
      <button
        v-for="item in items"
        :key="item.color"
        type="button"
        class="border-border hover:bg-muted rounded-md border px-3 py-1.5 text-sm"
        @click="fire(item.color)"
      >
        {{ item.label }}
      </button>
    </div>
    <GToaster />
  </div>
</template>
