<script setup lang="ts">
import { GLabel } from '@/components/gandalf/base/label'
import { Input } from '@/components/ui/input'
</script>

<template>
  <div class="not-prose border-border bg-muted/30 my-4 rounded-lg border p-8">
    <div class="flex flex-col items-start gap-8">
      <!-- Basic -->
      <div class="flex flex-col gap-2">
        <GLabel for="preview-email">Email address</GLabel>
        <Input id="preview-email" type="email" placeholder="you@example.com" class="w-64" />
      </div>

      <!-- Required -->
      <div class="flex flex-col gap-2">
        <GLabel for="preview-required" required>Full name</GLabel>
        <Input id="preview-required" type="text" placeholder="Juan García" class="w-64" />
      </div>

      <!-- Disabled -->
      <div class="flex flex-col gap-2">
        <GLabel for="preview-disabled" required disabled>Disabled field</GLabel>
        <Input id="preview-disabled" type="text" disabled class="w-64" />
      </div>
    </div>
  </div>
</template>
