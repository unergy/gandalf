<script setup lang="ts">
import { GLabel } from '@/components/gandalf/base/label'
import { Input } from '@/components/ui/input'
</script>

<template>
    <div class="not-prose border-border bg-muted/30 my-4 flex flex-col gap-4 rounded-lg border p-8">
        <div class="flex flex-col gap-2">
            <GLabel for="preview-email">Email</GLabel>
            <Input id="preview-email" type="email" placeholder="you@example.com" />
        </div>
    </div>
</template>
