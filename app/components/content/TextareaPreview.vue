<script setup lang="ts">
import { ref } from 'vue'
import { GTextarea } from '@/components/gandalf/textarea'
import { GLabel } from '@/components/gandalf/label'

const message = ref('')
</script>

<template>
    <div class="not-prose border-border bg-muted/30 my-4 flex flex-col gap-4 rounded-lg border p-8">
        <div class="flex flex-col gap-2">
            <GLabel for="preview-message">Message</GLabel>
            <GTextarea id="preview-message" v-model="message" placeholder="Type your message..." />
        </div>
    </div>
</template>
