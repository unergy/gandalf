<script setup lang="ts">
import { GAlert, GAlertTitle, GAlertDescription } from '@/components/gandalf/alert'
import { Terminal, AlertCircle } from 'lucide-vue-next'
</script>

<template>
    <div class="not-prose border-border bg-muted/30 my-4 flex flex-col gap-4 rounded-lg border p-8">
        <GAlert>
            <Terminal class="size-4" />
            <GAlertTitle>Heads up!</GAlertTitle>
            <GAlertDescription>You can add components to your app using the CLI.</GAlertDescription>
        </GAlert>
        <GAlert variant="destructive">
            <AlertCircle class="size-4" />
            <GAlertTitle>Error</GAlertTitle>
            <GAlertDescription>Your session has expired. Please log in again.</GAlertDescription>
        </GAlert>
    </div>
</template>
