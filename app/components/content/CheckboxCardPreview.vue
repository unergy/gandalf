<script setup lang="ts">
import { ref } from 'vue'
import CheckboxCard from '@/components/gandalf/kit/CheckboxCard.vue'

const notifications = ref<boolean | 'indeterminate'>(true)
const updates = ref<boolean | 'indeterminate'>(false)
</script>

<template>
    <div
        class="not-prose border-border bg-muted/30 my-4 flex flex-col items-center justify-center gap-3 rounded-lg border p-8">
        <CheckboxCard id="notifications" label="Enable notifications"
            description="Receive alerts when something important happens." :checked="notifications"
            @update:checked="notifications = $event" />
        <CheckboxCard id="updates" label="Product updates"
            description="Get notified about new features and improvements." :checked="updates"
            @update:checked="updates = $event" />
    </div>
</template>
