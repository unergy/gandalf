<script setup lang="ts">
import Avatar from '@/components/gandalf/kit/avatar/Avatar.vue'
</script>

<template>
  <div class="not-prose border-border bg-muted/30 my-4 flex flex-wrap items-center justify-center gap-6 rounded-lg border p-8">
    <!-- Default (no color) -->
    <Avatar fallback="CN" />
    <Avatar fallback="JD" variant="square" />

    <!-- Custom background color -->
    <Avatar fallback="AB" bg="#6366f1" />
    <Avatar fallback="MK" bg="#f59e0b" />
    <Avatar fallback="TR" bg="#10b981" />
    <Avatar fallback="PL" bg="#ef4444" />

    <!-- Background + text color -->
    <Avatar fallback="XY" bg="#1e293b" color="#f8fafc" />
    <Avatar fallback="RZ" bg="#fef3c7" color="#92400e" />

    <!-- With image + shape -->
    <Avatar src="https://github.com/shadcn.png" alt="@shadcn" fallback="CN" bg="#6366f1" />
    <Avatar src="https://github.com/shadcn.png" alt="@shadcn" fallback="CN" variant="square" bg="#10b981" />

    <!-- Custom size -->
    <Avatar fallback="LG" bg="#6366f1" color="#ffffff" class="size-12 text-base" />
  </div>
</template>
