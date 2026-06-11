<script setup lang="ts">
import { GAvatar, GAvatarImage, GAvatarFallback } from '@/components/gandalf/base/avatar'
</script>

<template>
  <div class="not-prose border-border bg-muted/30 my-4 flex flex-col items-center gap-6 rounded-lg border p-8">
    <!-- Rounded variant (default) -->
    <div class="flex items-center gap-4">
      <GAvatar>
        <GAvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <GAvatarFallback>CN</GAvatarFallback>
      </GAvatar>
      <GAvatar>
        <GAvatarFallback>JD</GAvatarFallback>
      </GAvatar>
      <GAvatar class="size-12">
        <GAvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <GAvatarFallback>CN</GAvatarFallback>
      </GAvatar>
    </div>
    <!-- Square variant -->
    <div class="flex items-center gap-4">
      <GAvatar variant="square">
        <GAvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <GAvatarFallback>CN</GAvatarFallback>
      </GAvatar>
      <GAvatar variant="square">
        <GAvatarFallback>JD</GAvatarFallback>
      </GAvatar>
      <GAvatar variant="square" class="size-12">
        <GAvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <GAvatarFallback>CN</GAvatarFallback>
      </GAvatar>
    </div>
  </div>
</template>
