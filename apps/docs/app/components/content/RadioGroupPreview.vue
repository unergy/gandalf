<script setup lang="ts">
import { ref } from 'vue'
import { GLabel, GRadioGroup, GRadioGroupItem } from '@unergy-dev/gandalf'

const plan = ref('yearly')
</script>

<template>
    <div class="not-prose border-border bg-muted/30 my-4 rounded-lg border p-8">
        <GRadioGroup v-model="plan" class="flex flex-col gap-3">
            <div class="flex items-center gap-2">
                <GRadioGroupItem id="preview-monthly" value="monthly" />
                <GLabel for="preview-monthly">Monthly</GLabel>
            </div>
            <div class="flex items-center gap-2">
                <GRadioGroupItem id="preview-yearly" value="yearly" />
                <GLabel for="preview-yearly">Yearly</GLabel>
            </div>
            <div class="flex items-center gap-2">
                <GRadioGroupItem id="preview-lifetime" value="lifetime" disabled />
                <GLabel for="preview-lifetime" disabled>Lifetime</GLabel>
            </div>
        </GRadioGroup>
    </div>
</template>
