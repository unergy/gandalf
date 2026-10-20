<script setup lang="ts">
import { GSkeleton } from '@/components/gandalf/base/skeleton'
</script>

<template>
    <div class="not-prose border-border bg-muted/30 my-4 flex items-center justify-center rounded-lg border p-8">
        <div class="flex items-center space-x-4">
            <GSkeleton class="size-12 rounded-full" />
            <div class="space-y-2">
                <GSkeleton class="h-4 w-62.5" />
                <GSkeleton class="h-4 w-50" />
            </div>
        </div>
    </div>
</template>
