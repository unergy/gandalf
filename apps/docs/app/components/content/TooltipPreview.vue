<script setup lang="ts">
import { Button } from '@unergy/gandalf/ui/button'
import { GTooltip, GTooltipProvider, GTooltipTrigger, GTooltipContent } from '@unergy/gandalf'
</script>

<template>
  <div class="not-prose border-border bg-muted/30 my-4 flex items-center justify-center rounded-lg border p-8">
    <GTooltipProvider>
      <GTooltip>
        <GTooltipTrigger as-child>
          <Button variant="outline">Hover me</Button>
        </GTooltipTrigger>
        <GTooltipContent>
          <p>Add to library</p>
        </GTooltipContent>
      </GTooltip>
    </GTooltipProvider>
  </div>
</template>
