<script setup lang="ts">
import { ref } from 'vue'
import { GInput } from '@/components/gandalf/base/input'
import { GLabel } from '@/components/gandalf/base/label'

const value = ref('')
</script>

<template>
  <div class="not-prose border-border bg-muted/30 my-4 flex flex-col gap-6 rounded-lg border p-8">
    <!-- Sizes -->
    <div class="flex flex-col gap-3">
      <div class="flex flex-col gap-1.5">
        <GLabel for="preview-sm">Small</GLabel>
        <GInput id="preview-sm" v-model="value" size="sm" placeholder="Small input…" />
      </div>
      <div class="flex flex-col gap-1.5">
        <GLabel for="preview-default">Default</GLabel>
        <GInput id="preview-default" v-model="value" placeholder="Default input…" />
      </div>
      <div class="flex flex-col gap-1.5">
        <GLabel for="preview-lg">Large</GLabel>
        <GInput id="preview-lg" v-model="value" size="lg" placeholder="Large input…" />
      </div>
    </div>
    <!-- States -->
    <div class="flex flex-col gap-3">
      <div class="flex flex-col gap-1.5">
        <GLabel for="preview-disabled">Disabled</GLabel>
        <GInput id="preview-disabled" placeholder="Disabled input…" disabled />
      </div>
      <div class="flex flex-col gap-1.5">
        <GLabel for="preview-readonly">Read-only</GLabel>
        <GInput id="preview-readonly" model-value="Read-only value" readonly />
      </div>
    </div>
  </div>
</template>
