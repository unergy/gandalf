<script setup lang="ts">
import { ref } from 'vue'
import { GMiniature } from '@unergy/gandalf'

const selected = ref(1)
</script>

<template>
    <div class="not-prose border-border bg-muted/30 my-4 flex flex-wrap gap-2 rounded-lg border p-8">
        <GMiniature
            v-for="n in 4"
            :key="n"
            :alt="`Thumbnail ${n}`"
            :model-value="selected === n"
            @update:model-value="selected = n"
        />
    </div>
</template>
