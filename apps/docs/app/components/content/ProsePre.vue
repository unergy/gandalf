<script setup lang="ts">
import { ref } from 'vue'
import { Check, Copy } from 'lucide-vue-next'

defineProps<{
  code: string
  language?: string
  filename?: string
  highlights?: number[]
  meta?: string
  class?: string
}>()

const copied = ref(false)

async function copy(code: string) {
  await navigator.clipboard.writeText(code)
  copied.value = true
  setTimeout(() => (copied.value = false), 2000)
}
</script>

<template>
  <div class="not-prose border-border my-4 overflow-hidden rounded-lg border">
    <!-- Header bar -->
    <div class="border-border bg-muted/40 flex items-center justify-between border-b px-4 py-2">
      <span class="text-muted-foreground font-mono text-xs">{{ language ?? '' }}</span>
      <button
        class="text-muted-foreground hover:bg-border hover:text-foreground flex items-center gap-1.5 rounded px-2 py-1 text-xs transition-colors"
        @click="copy(code)">
        <Check v-if="copied" class="text-success size-3.5" />
        <Copy v-else class="size-3.5" />
        {{ copied ? 'Copied!' : 'Copy' }}
      </button>
    </div>
    <!-- Pass Shiki's class (contains theme + CSS color vars) to <pre> -->
    <pre :class="$props.class" class="m-0 overflow-x-auto rounded-none !p-4 text-sm leading-relaxed"><slot /></pre>
  </div>
</template>

<style>
pre code .line {
  display: block;
}
</style>
