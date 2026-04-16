<script setup lang="ts">
import { GAvatar, GAvatarImage, GAvatarFallback } from '@/components/gandalf/avatar'
</script>

<template>
    <div class="not-prose border-border bg-muted/30 my-4 flex items-center justify-center gap-4 rounded-lg border p-8">
        <GAvatar>
            <GAvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <GAvatarFallback>CN</GAvatarFallback>
        </GAvatar>
        <GAvatar class="size-16">
            <GAvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <GAvatarFallback>CN</GAvatarFallback>
        </GAvatar>
        <GAvatar>
            <GAvatarFallback>JD</GAvatarFallback>
        </GAvatar>
    </div>
</template>
