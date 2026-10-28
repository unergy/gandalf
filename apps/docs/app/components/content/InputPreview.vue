<script setup lang="ts">
import { ref } from 'vue'
import { GInput, GLabel } from '@unergy/gandalf'

const name = ref('')
const email = ref('ana@')
</script>

<template>
    <div class="not-prose border-border bg-muted/30 my-4 flex flex-col gap-6 rounded-lg border p-8">
        <div class="flex flex-col gap-2">
            <GLabel for="preview-name">Name</GLabel>
            <GInput id="preview-name" v-model="name" placeholder="Ana Gómez" />
        </div>
        <div class="flex flex-col gap-2">
            <GLabel for="preview-sm">Small</GLabel>
            <GInput id="preview-sm" size="sm" placeholder="h-8, same as a small select" />
        </div>
        <div class="flex flex-col gap-2">
            <GLabel for="preview-invalid">Invalid</GLabel>
            <GInput id="preview-invalid" v-model="email" type="email" aria-invalid="true" />
        </div>
        <div class="flex flex-col gap-2">
            <GLabel for="preview-disabled">Disabled</GLabel>
            <GInput id="preview-disabled" disabled placeholder="Not editable" />
        </div>
    </div>
</template>
