<script setup lang="ts">
import { ref } from 'vue'
import { GCheckbox } from '@/components/gandalf/checkbox'
import { GLabel } from '@/components/gandalf/label'
</script>

<template>
    <div class="not-prose border-border bg-muted/30 my-4 flex flex-col gap-4 rounded-lg border p-8">
        <div class="flex items-center gap-2">
            <GCheckbox id="terms" />
            <GLabel for="terms">Accept terms and conditions</GLabel>
        </div>
        <div class="flex items-center gap-2">
            <GCheckbox id="newsletter" default-checked />
            <GLabel for="newsletter">Subscribe to newsletter</GLabel>
        </div>
        <div class="flex items-center gap-2">
            <GCheckbox id="disabled" disabled />
            <GLabel for="disabled" class="opacity-50">Disabled option</GLabel>
        </div>
    </div>
</template>
