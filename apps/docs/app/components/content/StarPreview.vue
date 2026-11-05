<script setup lang="ts">
import { ref } from 'vue'
import { GStar } from '@unergy/gandalf'

const favorite = ref(true)
const other = ref(false)
</script>

<template>
    <div class="not-prose border-border bg-muted/30 my-4 flex items-center gap-4 rounded-lg border p-8">
        <GStar v-model="favorite" />
        <GStar v-model="other" />
        <GStar v-model="favorite" size="sm" />
        <GStar v-model="other" size="sm" />
    </div>
</template>
