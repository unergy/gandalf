<script setup lang="ts">
import { ref } from 'vue'
import { GSearchField } from '@unergy/gandalf'

const query = ref('Plantas solares')
const empty = ref('')
</script>

<template>
    <div class="not-prose border-border bg-muted/30 my-4 flex flex-col gap-4 rounded-lg border p-8">
        <GSearchField v-model="query" />
        <GSearchField v-model="empty" size="sm" placeholder="Search projects" />
        <GSearchField v-model="empty" size="xs" placeholder="Search" />
        <GSearchField v-model="empty" disabled placeholder="Disabled" />
    </div>
</template>
