<script setup lang="ts">
import { ref } from 'vue'
import { Settings2 } from 'lucide-vue-next'
import {
  GButton,
  GLabel,
  GPopover,
  GPopoverContent,
  GPopoverTrigger,
  GSwitch,
} from '@unergy/gandalf'

const open = ref(false)
const compact = ref(false)
const archived = ref(true)
</script>

<template>
  <div
    class="not-prose border-border bg-muted/30 my-4 flex flex-wrap items-start gap-6 rounded-lg border p-8"
  >
    <div class="space-y-2">
      <p class="text-muted-foreground text-xs font-medium">Default</p>
      <GPopover>
        <GPopoverTrigger as-child>
          <GButton variant="outline">Open popover</GButton>
        </GPopoverTrigger>
        <GPopoverContent class="w-72">
          <p class="text-sm font-medium">Dimensions</p>
          <p class="text-muted-foreground mt-1 text-sm">
            A popover is a non-modal panel anchored to its trigger. Anything can live inside it.
          </p>
        </GPopoverContent>
      </GPopover>
    </div>

    <div class="space-y-2">
      <p class="text-muted-foreground text-xs font-medium">Controlled, aligned to the start</p>
      <GPopover v-model:open="open">
        <GPopoverTrigger as-child>
          <GButton variant="outline" size="icon">
            <Settings2 class="size-4" />
          </GButton>
        </GPopoverTrigger>
        <GPopoverContent align="start" class="w-64 space-y-3">
          <div class="flex items-center justify-between gap-4">
            <GLabel for="popover-compact">Compact rows</GLabel>
            <GSwitch id="popover-compact" v-model="compact" />
          </div>
          <div class="flex items-center justify-between gap-4">
            <GLabel for="popover-archived">Show archived</GLabel>
            <GSwitch id="popover-archived" v-model="archived" />
          </div>
        </GPopoverContent>
      </GPopover>
      <p class="text-muted-foreground text-xs">open: {{ open }}</p>
    </div>
  </div>
</template>
