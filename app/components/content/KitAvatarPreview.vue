<script setup lang="ts">
import Avatar from '@/components/gandalf/kit/avatar/Avatar.vue'
</script>

<template>
  <div class="not-prose border-border bg-muted/30 my-4 flex flex-wrap items-center justify-center gap-6 rounded-lg border p-8">
    <!-- Sizes, rounded -->
    <Avatar src="https://github.com/shadcn.png" alt="@shadcn" fallback="CN" size="sm" />
    <Avatar src="https://github.com/shadcn.png" alt="@shadcn" fallback="CN" size="default" />
    <Avatar src="https://github.com/shadcn.png" alt="@shadcn" fallback="CN" size="md" />
    <Avatar src="https://github.com/shadcn.png" alt="@shadcn" fallback="CN" size="lg" />

    <!-- Fallback only -->
    <Avatar fallback="JD" size="default" />
    <Avatar fallback="AB" size="default" variant="square" />

    <!-- Square variant -->
    <Avatar src="https://github.com/shadcn.png" alt="@shadcn" fallback="CN" size="md" variant="square" />
    <Avatar src="https://github.com/shadcn.png" alt="@shadcn" fallback="CN" size="lg" variant="square" />
  </div>
</template>
