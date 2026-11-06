<script setup lang="ts">
import { MessageCircle, Plus } from 'lucide-vue-next'
import { GFloatingButton } from '@unergy-dev/gandalf'
</script>

<template>
    <div class="not-prose border-border bg-muted/30 my-4 flex items-center gap-6 rounded-lg border p-10">
        <GFloatingButton aria-label="Add"><Plus /></GFloatingButton>
        <GFloatingButton aria-label="Open chat"><MessageCircle /></GFloatingButton>
        <GFloatingButton aria-label="Add" disabled><Plus /></GFloatingButton>
    </div>
</template>
