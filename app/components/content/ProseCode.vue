<script setup lang="ts">
import { ref } from 'vue'
import { Check, Copy } from 'lucide-vue-next'

defineProps<{
    code: string
    language?: string
    filename?: string
    highlights?: number[]
    meta?: string
}>()

const copied = ref(false)

async function copy(code: string) {
    await navigator.clipboard.writeText(code)
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
}
</script>

<template>
    <div class="not-prose my-4 overflow-hidden rounded-lg border border-border bg-[#f6f8fa]">
        <!-- Header bar -->
        <div class="flex items-center justify-between border-b border-border bg-[#f6f8fa] px-4 py-2">
            <span class="font-mono text-xs text-muted-foreground">{{ language ?? 'code' }}</span>
            <button
                class="flex items-center gap-1.5 rounded px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-border hover:text-foreground"
                @click="copy(code)">
                <Check v-if="copied" class="size-3.5 text-success" />
                <Copy v-else class="size-3.5" />
                {{ copied ? 'Copied!' : 'Copy' }}
            </button>
        </div>
        <!-- Code content rendered by Shiki -->
        <div class="overflow-x-auto p-4 text-sm leading-relaxed">
            <slot />
        </div>
    </div>
</template>
