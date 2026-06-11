<script setup lang="ts">
import Avatar from '@/components/gandalf/kit/avatar/Avatar.vue'
</script>

<template>
  <div class="not-prose border-border bg-muted/30 my-4 flex flex-wrap items-center justify-center gap-6 rounded-lg border p-8">
    <!-- Rounded (default) -->
    <Avatar src="https://github.com/shadcn.png" alt="@shadcn" fallback="CN" />

    <!-- Square -->
    <Avatar src="https://github.com/shadcn.png" alt="@shadcn" fallback="CN" variant="square" />

    <!-- Fallback only -->
    <Avatar fallback="JD" />
    <Avatar fallback="AB" variant="square" />

    <!-- Custom sizes via class -->
    <Avatar src="https://github.com/shadcn.png" alt="@shadcn" fallback="CN" class="size-6" />
    <Avatar src="https://github.com/shadcn.png" alt="@shadcn" fallback="CN" />
    <Avatar src="https://github.com/shadcn.png" alt="@shadcn" fallback="CN" class="size-10" />
    <Avatar src="https://github.com/shadcn.png" alt="@shadcn" fallback="CN" class="size-12" />
  </div>
</template>
