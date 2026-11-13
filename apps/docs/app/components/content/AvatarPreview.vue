<script setup lang="ts">
import { GAvatar, GAvatarImage, GAvatarFallback } from '@unergy-dev/gandalf'

const semantics = ['default', 'action', 'information', 'success', 'warning', 'destructive'] as const
const sizes = ['xs', 'sm', 'md', 'lg'] as const
const types = ['circle', 'square'] as const
</script>

<template>
  <div class="not-prose border-border my-4 flex flex-col items-center gap-6 rounded-lg border p-8">
    <div v-for="type in types" :key="type" class="flex flex-col gap-6">
      <div v-for="size in sizes" :key="size" class="flex items-center gap-6">
        <GAvatar v-for="semantic in semantics" :key="semantic" :type="type" :size="size" :semantic="semantic">
          <GAvatarFallback>AV</GAvatarFallback>
        </GAvatar>
      </div>
    </div>
    <div class="flex items-center gap-6">
      <GAvatar size="md">
        <GAvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <GAvatarFallback>CN</GAvatarFallback>
      </GAvatar>
      <GAvatar type="square" size="md">
        <GAvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <GAvatarFallback>CN</GAvatarFallback>
      </GAvatar>
    </div>
  </div>
</template>
